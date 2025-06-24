import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Devices } from "@/types/deviceControllerTypes";
import { Entry } from './types/ADLEntry';
import StyleRender from './StyleRender';
import DeviceRender from './DeviceRender';
import { ADLParser } from './utils/ADLParse';
import * as detectorSetup from './utils/simDetectorSetupADL';
import { ADSetup } from "./utils/simDetectorSetupADL";
import useOphydSocket from '@/hooks/useOphydSocket';

export type ADLCanvasProps = {
    devices: Devices;
    ADLData: any;
    onSubmit?: (pv: string, value: string | boolean | number) => void
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
const P = "13SIM1"
const R = "cam1"

const createDeviceNameArray = (Data: Entry[]) => {

    var pvArray: string[] = [];
    Data.forEach((group) => {
        let pv = `${P}:${R}:${extractPVName(group.name)}`
        pvArray.push(pv);

    })

    return pvArray;
};



function ADLCanvas({ ADLData, devices, onSubmit = () => { } }: ADLCanvasProps) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
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
                const displayDevice = useMemo(
                    () => ADLData.find((d: Entry) => d.var_type === "display"),
                    [ADLData]
                );

                // Update dimensions safely
                useEffect(() => {
                    if (displayDevice) {
                        setDimensions(displayDevice.size);
                    }
                }, [displayDevice]); // Only runs when displayDevice changes
            }
            else if (device.var_type === "composite" && device.comp_file !== undefined) {
                const objectName = device.comp_file.split('.')[0];
                const component = detectorSetup[objectName as keyof typeof detectorSetup];

                const data = ADLParser(component)
                var deviceNames = useMemo(() => createDeviceNameArray(ADLData), []);
                const wsUrl = useMemo(() => 'ws://localhost:8000/ophydSocket', []);
                const { devices, handleSetValueRequest, } = useOphydSocket(wsUrl, deviceNames);
                const onSubmitSettings = useCallback(handleSetValueRequest, []);
                return (
                    <React.Fragment key={index}>
                        <ADLCanvas ADLData={data} devices={devices} onSubmit={onSubmitSettings} />
                    </React.Fragment>
                )

            }
            else {
                let pv = `${P}:${R}:${extractPVName(device.name)}`;

                return (
                    <>
                        <React.Fragment key={device.name}>
                            <DeviceRender PV={devices[pv]} ADLEntry={device} onSubmit={onSubmit} />
                        </React.Fragment>
                    </>

                );
            }

        });
    };
    return (
        <>
            <div style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }} className="relative">
                {renderDevices()}
            </div>

        </>

    )
}

export default ADLCanvas