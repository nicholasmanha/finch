import React from 'react';
import { Entry } from './types/ADLEntry';
import { Device } from "@/types/deviceControllerTypes";

export type DropdownProps = {
    PV: Device;
    ADLEntry: Entry;
}

function Dropdown({ PV, ADLEntry }: DropdownProps) {
    console.log("Dropdown PV: ", PV); // Debug log

    // render nothing if PV or enum_strs is missing
    if (!PV || !PV.enum_strs) {
        return null;
    }

    return (
        <div
            className="absolute"
            style={{
                left: `${ADLEntry.location.x}px`,
                top: `${ADLEntry.location.y}px`,
                width: `${ADLEntry.size.width}px`,
                height: `${ADLEntry.size.height}px`
            }}
        >
            {typeof PV.value === "number" ?
                <select name="cars" id="cars" value={PV.value}>
                    {PV.enum_strs.map((option: string, index: number) => (
                        <option key={index} value={index}>
                            {option}
                        </option>
                    ))}
                </select>
                :
                <>{console.log("PV value NaN")}</>
            }

        </div>
    );
}

export default Dropdown;