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
export default function ADLView(
  {
    prefix = '13SIM1',
    settings = cameraDeviceData.ADSimDetector,
    enableControlPanel = true,

  }: CameraContainerProps) {

  const P = "13SIM1"
  const R = "cam1"

    const ADLData = ADLParser(adSimDetectorSetup)


  // removes trailing ":" and trims
  const sanitizeInputPrefix = (prefix: string) => {
    var santizedPrefix = '';
    if (prefix.trim().slice(-1) === ':') {
      santizedPrefix = prefix.trim().substring(0, prefix.length - 1)
    } else {
      santizedPrefix = prefix.trim();
    }
    return santizedPrefix;
  };

const createDeviceNameArray = (settings: DetectorSetting[], prefix: string) => {

    var pvArray: string[] = [];
    ADLData.forEach((group) => {
      let pv = `${P}:${R}:${group.name}`
      pvArray.push(pv);
      
    })
    
    return pvArray;
  };

  const createDeviceNameArrayold = (settings: DetectorSetting[], prefix: string) => {
    //settings is an array of objects, grouped by setting type
    //ex) a single pv suffix is at settings[0].inputs[0].suffix
    //console.log({settings})

    var sanitizedPrefix = sanitizeInputPrefix(prefix); // prefix without trailing ":" or spaces

    var pvArray: string[] = [];
    settings.forEach((group) => {
      group.inputs.forEach((input) => {
        //console.log(group.prefix)

        // prefx:devicePrefix:suffic, ex. 13SIM1:cam1:GainRed
        let pv = `${sanitizedPrefix}:${group.prefix !== null ? group.prefix + ':' : ''}${input.suffix}`

        // array of output from above
        pvArray.push(pv);
      })
    })
    if (enableControlPanel) {
      let controlPV: string | false = createControlPVString(prefix);
      controlPV && pvArray.push(controlPV);
    }
    return pvArray;
  };

  const createControlPVString = (prefix = '') => {
    if (prefix === '' && enableControlPanel) {
      console.log('Error in concatenating a camera control PV, received empty prefix string');
      return false;
    }
    let acquireSuffix = 'cam1:Acquire'; //the suffix responsible for acquiring images, has a value of 1 or 0
    var controlPV = `${sanitizeInputPrefix(prefix)}:${acquireSuffix}`;
    return controlPV;
  };

  // array of ex. "13SIM1:cam1:GainRed"
  // settings is cameraDeviceData which is json of data fro PV's for the camera
  var deviceNames = useMemo(() => createDeviceNameArray(settings, prefix), []);
  const wsUrl = useMemo(() => 'ws://localhost:8000/ophydSocket', []);


  //we need a ws just for the control PV, since a user may only want that one
  //we need another ws just for the settings PVs, in case the user wants those options.
  //or can we just combine them into one?

  const { devices } = useOphydSocket(wsUrl, deviceNames);



  const deviceNameList = useMemo(() => ['IOC:m1', 'IOC:m2'], []);
  // const { devices, handleSetValueRequest} = useOphydSocket(wsUrl, deviceNameList);
  var device = devices['IOC:m1']
  console.log("devices-ADLViewer: ", devices)

  return (
    <div className="w-full h-full flex flex-wrap space-x-4 items-start justify-center">

      <DeviceRender PVs={devices} ADLData={ADLData} />

    </div>
  )

}