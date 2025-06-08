import React from 'react'
import { Device } from "@/types/deviceControllerTypes";
import { Entry } from './types/ADLEntry';

export type DeviceRenderProps = {
    PV: Device;
    ADLEntry: Entry;
}



function DeviceRender({ PV, ADLEntry }: DeviceRenderProps) {

    if (!PV) return;
    console.log("device render data: ", ADLEntry);

    const renderInput = () => {
        if (typeof PV.value === 'number') {
            switch (ADLEntry.var_type) {
                case "entry":
                    return <input
                        type="text"
                        value={PV.value}
                        onChange={(e) => {
                            console.log("New value:", e.target.value);
                        }}
                        className="absolute"
                        style={{ left: `${ADLEntry.location.x}px`, top: `${ADLEntry.location.y}px`, width: `${ADLEntry.size.width}px`, height: `${ADLEntry.size.height}px` }}
                    />
                case "update":
                    return <div className="absolute"
                        style={{ left: `${ADLEntry.location.x}px`, top: `${ADLEntry.location.y}px`, width: `${ADLEntry.size.width}px`, height: `${ADLEntry.size.height}px` }}>{PV.value}</div>

                default:

                    return <p>Input type error</p>;
            }
        }
    }

    return (
        <>
            {renderInput()}
        </>
    )
}

export default DeviceRender