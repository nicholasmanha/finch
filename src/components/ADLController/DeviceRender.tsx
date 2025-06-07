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
                        value={PV.value} // Prepopulated value from PV object
                        onChange={(e) => {
                            // Handle change if needed
                            console.log("New value:", e.target.value);
                        }}
                        className="border p-2 rounded" // Optional styling
                    />
                case "update":
                    return <div>{PV.value}</div>

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