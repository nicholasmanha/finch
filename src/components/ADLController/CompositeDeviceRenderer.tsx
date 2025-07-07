import { useCallback, useEffect, useMemo, useState } from "react";
import { Entry } from "./types/ADLEntry";
import { ADLParser } from "./utils/ADLParse";
import { parseCustomFormat } from "./utils/ADLtoJSON";
import { createDeviceNameArray } from "./utils/CreateDeviceNameArray";
import useOphydSocket from "@/hooks/useOphydSocket";
import React from "react";
import ADLCanvas from "./ADLCanvas";

// GitHub repo configuration
const GITHUB_OWNER = "nicholasmanha"; // Replace with your GitHub username
const GITHUB_REPO = "AD_ADL_files"; // Replace with your repo name
const GITHUB_BRANCH = "main"; // Replace with your branch name

// Cache for ADL files to avoid repeated fetches
const adlCache = new Map<string, string>();

const fetchADLFile = async (fileName: string): Promise<string | null> => {
  // Check cache first
  if (adlCache.has(fileName)) {
    return adlCache.get(fileName)!;
  }

  try {
    const url = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${fileName}.adl`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Failed to fetch ${fileName}.adl: ${response.status}`);
      return null;
    }
    
    const content = await response.text();
    adlCache.set(fileName, content);
    return content;
  } catch (error) {
    console.error(`Error fetching ADL file ${fileName}:`, error);
    return null;
  }
};

export function CompositeDeviceRenderer({
  device,
  index,
  args,
}: {
  device: Entry;
  index: number;
  args: { [key: string]: any };
}): JSX.Element {
  const [adlData, setAdlData] = useState<Entry[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canvasStyle = {
    position: "absolute" as const,
    left: `${device.location.x}px`,
    top: `${device.location.y}px`,
  };

  useEffect(() => {
    if (device.comp_file !== undefined) {
      const fileNameNoADL: string = device.comp_file.split(".")[0];
      
      const loadADLFile = async () => {
        setLoading(true);
        setError(null);
        
        try {
          const adlContent = await fetchADLFile(fileNameNoADL);
          
          if (!adlContent) {
            setError(`${device.comp_file} not found`);
            return;
          }
          
          const parsedData = ADLParser(parseCustomFormat(adlContent));
          setAdlData(parsedData);
        } catch (err) {
          setError(`Error loading ${device.comp_file}`);
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      loadADLFile();
    } else if (device.children !== undefined) {
      setAdlData(device.children);
    }
  }, [device.comp_file, device.children]);

  const deviceNames = useMemo(() => {
    if (!adlData) return [];
    return createDeviceNameArray(adlData, args);
  }, [adlData, args]);

  const { devices, handleSetValueRequest } = useOphydSocket(deviceNames);
  const onSubmitSettings = useCallback(handleSetValueRequest, []);

  if (loading) {
    return (
      <div className="text-blue-500" style={canvasStyle}>
        Loading {device.comp_file}...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500" style={canvasStyle}>
        {error}
      </div>
    );
  }

  if (!adlData) {
    return <div style={canvasStyle}></div>;
  }

  return (
    <React.Fragment key={index}>
      <ADLCanvas
        ADLData={adlData}
        devices={devices}
        onSubmit={onSubmitSettings}
        style={canvasStyle}
        {...args}
      />
    </React.Fragment>
  );
}