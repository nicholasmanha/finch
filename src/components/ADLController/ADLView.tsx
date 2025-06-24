import { useMemo, useCallback, CSSProperties } from "react";
import useOphydSocket from "@/hooks/useOphydSocket";
import {simDetector } from "./utils/simDetectorSetupADL";
import { Entry } from "./types/ADLEntry";
import { ADLParser } from "./utils/ADLParse";
import ADLCanvas from "./ADLCanvas";
import { cn } from "@/lib/utils";

export type ADLViewProps = {
  className?: string;
}

export default function ADLView({ className }: ADLViewProps) {

  const P = "13SIM1"
  const R = "cam1"
  const ADLData = ADLParser(simDetector)

  function extractPVName(input: string): string {
    if (!input) return '';

    // Remove all $(...) patterns
    const withoutPrefix = input.replace(/\$\(.*?\)/g, '');

    // Return what remains (or original string if no patterns were found)
    return withoutPrefix || input;
  }

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
  return (
    <>
      <div className={cn(
        "inline-block rounded-xl bg-slate-100 p-4", 
        className 
      )}>
        <ADLCanvas ADLData={ADLData} devices={devices} onSubmit={onSubmitSettings} />
      </div>

    </>
  )

}
