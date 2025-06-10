import { useMemo, useCallback } from "react";


import CameraSettings from "../Camera/CameraSettings";
//import { useCamera } from "./hooks/useCamera";
import { cameraDeviceData } from "../Camera/utils/cameraDeviceData.js";
import useOphydSocket from "@/hooks/useOphydSocket";
import { DetectorSetting } from "../Camera/types/cameraTypes";
import InputGroup from "../Camera/InputGroup";
import InputField from "../Camera/InputField";
import CameraContainer from "../Camera/CameraContainer";
import DeviceControllerBox from "../DeviceControllerBox";
import { deviceIcons } from '@/assets/icons';
import BasicInput from "./BasicInput";
import DeviceRender from "./DeviceRender";
import { adSimDetectorSetup } from "./utils/simDetectorSetupADL";
import { Entry } from "./types/ADLEntry";
import { ADLParser } from "./utils/ADLParse";
import React from "react";
import StyleRender from "./StyleRender";
import ADLCanvas from "./ADLCanvas";


export default function ADLView() {

  const P = "13SIM1"
  const R = "cam1"

  const ADLData = ADLParser(adSimDetectorSetup)

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

  const { devices } = useOphydSocket(wsUrl, deviceNames);



  return (
    <>
      <ADLCanvas ADLData={ADLData} devices={devices} />
    </>
  )

}