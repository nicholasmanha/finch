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

//"13SIM1:image1:ArrayData"
export type CameraContainerProps = {
  prefix: string;
  customSetup?: boolean;
  imageArrayPV?: string;
  settings?: DetectorSetting[];
  enableControlPanel?: boolean;
  enableSettings?: boolean;
  canvasSize?: 'small' | 'medium' | 'large' | 'automatic';
  sizePVs?: {
    startX_pv: string;
    startY_pv: string;
    sizeX_pv: string;
    sizeY_pv: string;
    colorMode_pv: string;
    dataType_pv: string;
  }
}
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



  // const deviceNameList = useMemo(() => ['IOC:m1', 'IOC:m2'], []);
  // const { devices, handleSetValueRequest} = useOphydSocket(wsUrl, deviceNameList);
  var device = devices['IOC:m1']
  console.log("devices-ADLViewer: ", devices)

  return (
    <div className="w-full h-full flex flex-wrap space-x-4 items-start justify-center">

      <DeviceRender PVs={devices} ADLData={ADLData} />

    </div>
  )

}