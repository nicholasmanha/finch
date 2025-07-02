import { useMemo, useCallback } from "react";
import useOphydSocket from "@/hooks/useOphydSocket";
import * as ADLs from './utils/adl';
import { Entry } from "./types/ADLEntry";
import { ADLParser } from "./utils/ADLParse";
import ADLCanvas from "./ADLCanvas";
import { cn } from "@/lib/utils";
import { parseCustomFormat } from "./utils/ADLtoJSON";



export type ADLViewProps = {
  className?: string;
  fileName: string;
  [key: string]: any;

}

export default function ADLView({ className, fileName, ...args }: ADLViewProps) {


  // Process the P and R values to remove $(...)  patterns



  const fileNameNoADL: string = fileName.split('.')[0];
  const component = ADLs.default[fileNameNoADL as keyof typeof ADLs];
  const ADLData = ADLParser(parseCustomFormat(component))

  const createDeviceNameArray = (Data: Entry[]) => {

    var pvArray: string[] = [];
    Data.forEach((group) => {
      if (group.var_type !== 'text' && group.var_type !== 'display' && group.var_type !== 'composite') {
        
        //let pv = `${P}:${R}:${extractPVName(group.name)}`
        
        let pv = replacePlaceholders(group.name, args)
        pvArray.push(pv);
      }


    })
    return pvArray;
  };

  const replacePlaceholders = (templateString: string, args: Record<string, any>): string => {
    // Split the string by placeholders while keeping the parts
    const parts: string[] = [];
    let lastIndex = 0;

    templateString.replace(/\$\(([^)]+)\)/g, (match, key, offset) => {
      // Add any literal text before this placeholder
      if (offset > lastIndex) {
        parts.push(templateString.slice(lastIndex, offset));
      }

      // Add the replacement value
      parts.push(args[key] !== undefined ? String(args[key]) : match);

      lastIndex = offset + match.length;
      return match;
    });

    // Add any remaining literal text after the last placeholder
    if (lastIndex < templateString.length) {
      parts.push(templateString.slice(lastIndex));
    }

    // Join all parts with ":"
    return parts.filter(part => part.length > 0).join(":");
  };

  // array of ex. "13SIM1:cam1:GainRed"
  // settings is cameraDeviceData which is json of data fro PV's for the camera
  var deviceNames = useMemo(() => createDeviceNameArray(ADLData), []);
  const wsUrl = useMemo(() => 'ws://localhost:8000/ophydSocket', []);

  //we need a ws just for the control PV, since a user may only want that one
  //we need another ws just for the settings PVs, in case the user wants those options.
  //or can we just combine them into one?

  const { devices, handleSetValueRequest, } = useOphydSocket(wsUrl, deviceNames);
  const onSubmitSettings = useCallback(handleSetValueRequest, []);

  function extractPVName(input: string): string {
    if (!input) return '';

    // Remove all $(...) patterns
    const withoutPrefix = input.replace(/\$\(.*?\)/g, '');

    // Return what remains (or original string if no patterns were found)
    return withoutPrefix || input;
  }
  return (
    <>
      <div className={cn(
        "inline-block rounded-xl bg-slate-100 p-4",
        className
      )}>
        <ADLCanvas
          ADLData={ADLData}
          
          devices={devices}
          onSubmit={onSubmitSettings}
          {...args}
        />
      </div>
    </>
  )

}
