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

  console.log("view args: ", args)

  // Process the P and R values to remove $(...)  patterns
  const P = extractPVName(args.P || '');
  const R = extractPVName(args.R || '');
  
  console.log("view P: ", P, " view R: ", R)

  const fileNameNoADL: string = fileName.split('.')[0];
  const component = ADLs.default[fileNameNoADL as keyof typeof ADLs];
  const ADLData = ADLParser(parseCustomFormat(component))

  const createDeviceNameArray = (Data: Entry[]) => {

    var pvArray: string[] = [];
    Data.forEach((group) => {
      let pv = `${P}:${R}:${extractPVName(group.name)}`
      pvArray.push(pv);

    })

    return pvArray;
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
          R={R}
          P={P}
          devices={devices}
          onSubmit={onSubmitSettings}
        />
      </div>
    </>
  )

}
