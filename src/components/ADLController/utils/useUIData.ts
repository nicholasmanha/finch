import { useMemo, useCallback, useState, useEffect } from "react";
import useOphydSocket from "@/hooks/useOphydSocket";
import { ADLParser } from "./ADLParse";
import { parseCustomFormat } from "./ADLtoJSON";
import { createDeviceNameArray } from "./CreateDeviceNameArray";
import { fetchFile } from "./fetchFile";
import { Entry } from "../types/UIEntry";
import { parseXMLToEntries } from "./BobParser";

export interface UseUIDataOptions {
  fileName?: string;
  children?: Entry[];
  args: { [key: string]: any };
}

export interface UseUIDataReturn {
  ADLData: Entry[] | null;
  loading: boolean;
  error: string | null;
  devices: any;
  onSubmitSettings: (deviceName: string, value: any) => void;
}

export function useUIData({
  fileName,
  children,
  args,
}: UseUIDataOptions): UseUIDataReturn {
  const [ADLData, setADLData] = useState<Entry[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If children are provided directly, use them
    if (children) {
      setADLData(children);
      return;
    }

    // If no fileName, nothing to load
    if (!fileName) {
      setADLData(null);
      return;
    }

    const loadADLFile = async () => {
      setLoading(true);
      setError(null);
      const fileNameNoADL: string = fileName.split(".")[0];
      const fileType: string = fileName.split(".")[1];
      const fileNameClean = fileType.toLowerCase() === "opi" ? `${fileNameNoADL}.bob` : fileName;
      const fileTypeClean: string = fileType.toLowerCase() === "opi" ? 'bob' : fileType
      try {
        
        const adlContent = await fetchFile(fileNameClean, "nicholasmanha", `AD_${fileTypeClean.toUpperCase()}_files`);

        if (!adlContent) {
          setError(`${fileName} not found`);
          return;
        }
        let parsedData: Entry[]
        switch (fileType.toLowerCase()) {
          case "bob":
            parsedData = parseXMLToEntries(adlContent)
            break;
          case "adl":
            parsedData = ADLParser(parseCustomFormat(adlContent));
            break;
          default:
            parsedData = []
            break;
        }
        console.log(JSON.stringify(parsedData))
        setADLData(parsedData);

      } catch (err) {
        setError(`Error loading ${fileName}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadADLFile();
  }, [fileName, children]);

  // Memoize deviceNames to prevent unnecessary websocket reconnections
  const deviceNames = useMemo(() => {
    if (!ADLData) return [];
    return createDeviceNameArray(ADLData, args);
  }, [ADLData, JSON.stringify(args)]);

  const { devices, handleSetValueRequest } = useOphydSocket(deviceNames);
  const onSubmitSettings = useCallback(handleSetValueRequest, [
    handleSetValueRequest,
  ]);

  return {
    ADLData,
    loading,
    error,
    devices,
    onSubmitSettings,
  };
}
