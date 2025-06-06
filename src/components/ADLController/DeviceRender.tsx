import React from 'react'
import { Devices } from "@/types/deviceControllerTypes";
import { Entry } from './types/ADLEntry';

export type DeviceRenderProps = {
    PVs: Devices;
    ADLData: Entry[];
}



function DeviceRender({ PVs, ADLData=[]}: DeviceRenderProps) {
    if (!PVs) return;
    console.log("device render data: ",ADLData);
    return (
        <>
            {ADLData.map((entry, index) => (
          <li key={index}>{entry.name}</li>
        ))}
            
        </>


    )
}

export default DeviceRender