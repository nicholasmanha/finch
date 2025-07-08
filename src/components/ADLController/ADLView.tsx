import { useMemo, useCallback, useState, useEffect } from "react";
import useOphydSocket from "@/hooks/useOphydSocket";
import { ADLParser } from "./utils/ADLParse";
import ADLCanvas from "./ADLCanvas";
import { cn } from "@/lib/utils";
import { parseCustomFormat } from "./utils/ADLtoJSON";
import { createDeviceNameArray } from "./utils/CreateDeviceNameArray";
import { fetchADLFile } from "./utils/GithubFetch";
import { Entry } from "./types/ADLEntry";
import { parseXMLToEntries } from "./utils/BobParser";
import * as BOBs from "./utils/bob";

export type ADLViewProps = {
  className?: string;
  fileName: string;
  [key: string]: any;
};

export default function ADLView({
  className,
  fileName,
  ...args
}: ADLViewProps) {
  const [ADLData, setADLData] = useState<Entry[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileNameNoADL: string = fileName.split(".")[0];
  const fileType: string = fileName.split(".")[1];

  useEffect(() => {
    const loadADLFile = async () => {
      setLoading(true);
      setError(null);
      if (fileType === 'bob') {
        const component = BOBs.default[fileNameNoADL as keyof typeof BOBs];
        //const xmlString = `<?xml version="1.0" encoding="UTF-8"?>...`; // your XML
        const entries = parseXMLToEntries(component);

        setADLData(entries);
        setLoading(false);
        
      }
      else {
        try {
          const adlContent = await fetchADLFile(fileNameNoADL);

          if (!adlContent) {
            setError(`${fileName} not found`);
            return;
          }
          // const component = BOBs.default[fileNameNoADL as keyof typeof BOBs];
          // //const xmlString = `<?xml version="1.0" encoding="UTF-8"?>...`; // your XML
          // const entries = parseXMLToEntries(component);
          // console.log(JSON.stringify(entries, null, 2));

          const parsedData = ADLParser(parseCustomFormat(adlContent));

          setADLData(parsedData);
        } catch (err) {
          setError(`Error loading ${fileName}`);
          console.error(err);
        } finally {
          setLoading(false);
        }
      }

    };

    loadADLFile();
  }, [fileName]);

  // Memoize deviceNames to prevent unnecessary websocket reconnections
  const deviceNames = useMemo(() => {
    if (!ADLData) return [];
    return createDeviceNameArray(ADLData, args);
  }, [ADLData, JSON.stringify(args)]); // needs to be JSON.stringify so it doesnt perform unnecessary rerenders

  const wsUrl = useMemo(() => "ws://localhost:8000/ophydSocket", []);

  const { devices, handleSetValueRequest } = useOphydSocket(deviceNames);
  const onSubmitSettings = useCallback(handleSetValueRequest, [handleSetValueRequest]);

  if (loading) {
    return (
      <div className={cn("inline-block rounded-xl bg-slate-100 p-4 mt-4", className)}>
        <div className="text-blue-500">Loading {fileName}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("inline-block rounded-xl bg-slate-100 p-4 mt-4", className)}>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!ADLData) {
    return (
      <div className={cn("inline-block rounded-xl bg-slate-100 p-4 mt-4", className)}>
        <div className="text-white">No data available</div>
      </div>
    );
  }
  return (
    <>
      <div
        className={cn("inline-block rounded-xl bg-slate-100 p-4 mt-4", className)}
      >
        <ADLCanvas
          ADLData={ADLData}
          devices={devices}
          onSubmit={onSubmitSettings}
          {...args}
        />
      </div>
    </>
  );
}