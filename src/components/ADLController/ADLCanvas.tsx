import React from 'react'
import { Devices } from "@/types/deviceControllerTypes";
import { Entry } from './types/ADLEntry';
import StyleRender from './StyleRender';
import DeviceRender from './DeviceRender';

export type ADLCanvasProps = {
    devices: Devices;
    ADLData: any;
}

function extractPVName(input: string): string {
    if (!input) return '';

    // Remove all $(...) patterns
    const withoutPrefix = input.replace(/\$\(.*?\)/g, '');

    // Return what remains (or original string if no patterns were found)
    return withoutPrefix || input;
}

let width = 0;
let height = 0;

function ADLCanvas({ ADLData, devices }: ADLCanvasProps) {
    const P = "13SIM1"
    const R = "cam1"
    const renderDevices = () => {
        return ADLData.map((device: Entry, index: number) => {
            if (device.var_type === "text") {
                return (
                    <React.Fragment key={index}>
                        <StyleRender ADLEntry={device} />
                    </React.Fragment>
                );
            }
            else if (device.var_type === "display") {
                width = device.size.width;
                height = device.size.width;
            }
            else {
                let pv = `${P}:${R}:${extractPVName(device.name)}`;

                return (
                    <>
                        <React.Fragment key={device.name}>
                            <DeviceRender PV={devices[pv]} ADLEntry={device} />
                        </React.Fragment>
                    </>

                );
            }

        });
    };
    return (
        <>
            <div
                style={{ width: `${width}px`, height: `${height}px` }}
                className="bg-red-200 relative"
            >
                {renderDevices()}
            </div>

        </>

    )
}

export default ADLCanvas