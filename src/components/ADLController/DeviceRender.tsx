import React from 'react'
import { Device } from "@/types/deviceControllerTypes";
import { Entry } from './types/ADLEntry';

export type DeviceRenderProps = {
    PV: Device;
    ADLData: Entry[];
}



function DeviceRender({ PV, ADLData = [] }: DeviceRenderProps) {
    
    if (!PV) return;
    console.log("device render data: ", PV);
    return (
        <>
                <li key={PV.name}>{PV.name}: {PV.value}</li>

        </>


    )
}

export default DeviceRender