import React from 'react'
import { useState } from "react";
import { Device } from "@/types/deviceControllerTypes";
import InputNumber from "../InputNumber";
import Button from "../Button";

export type DeviceRenderProps = {
    device: Device;
    
}

function DeviceRender({ device}: DeviceRenderProps) {
    if (!device) return;
    return (
        <>
            <div>name: {device.name} value: {device.value}</div><br></br>
            
        </>


    )
}

export default DeviceRender