import React, { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react'
import { Devices } from "@/types/deviceControllerTypes";
import { Entry } from './types/ADLEntry';
import StyleRender from './StyleRender';
import DeviceRender from './DeviceRender';
import { ADLParser } from './utils/ADLParse';
import * as detectorSetup from './utils/adl';
import useOphydSocket from '@/hooks/useOphydSocket';
import { parseCustomFormat } from './utils/ADLtoJSON';

export type ADLCanvasProps = {
    devices: Devices;
    ADLData: any;
    onSubmit?: (pv: string, value: string | boolean | number) => void
    style?: React.CSSProperties;
}

function extractPVName(input: string): string {
    if (!input) return '';

    // Remove all $(...) patterns
    const withoutPrefix = input.replace(/\$\(.*?\)/g, '');

    // Return what remains (or original string if no patterns were found)
    return withoutPrefix || input;
}

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



function ADLCanvas({ ADLData, devices, onSubmit = () => { }, style }: ADLCanvasProps) {
    // console.log(detectorSetup.default.ADBase)
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
            else if (device.var_type === "composite") {
                if (device.comp_file !== undefined) {
                    const objectName = device.comp_file.split('.')[0];
                    const component = detectorSetup.default[objectName as keyof typeof detectorSetup];
                    const ADLJson = parseCustomFormat(component)
                    const data = ADLParser(ADLJson)
                    var deviceNames = useMemo(() => createDeviceNameArray(data), []);
                    const wsUrl = useMemo(() => 'ws://localhost:8000/ophydSocket', []);
                    const { devices, handleSetValueRequest, } = useOphydSocket(wsUrl, deviceNames);
                    const onSubmitSettings = useCallback(handleSetValueRequest, []);
                    return (
                        <React.Fragment key={index}>
                            <ADLCanvas ADLData={data} devices={devices} onSubmit={onSubmitSettings} style={{ position: 'absolute', left: `${device.location.x}px`, top: `${device.location.y}px` }} />
                        </React.Fragment>
                    )
                }
                else if (device.children !== undefined) {

                    var deviceNames = useMemo(() => createDeviceNameArray(device.children!), []);
                    const wsUrl = useMemo(() => 'ws://localhost:8000/ophydSocket', []);
                    const { devices, handleSetValueRequest, } = useOphydSocket(wsUrl, deviceNames);
                    const onSubmitSettings = useCallback(handleSetValueRequest, []);
                    return (
                        <React.Fragment key={index}>
                            <ADLCanvas ADLData={device.children!} devices={devices} onSubmit={onSubmitSettings} style={{ position: 'absolute' }} />
                        </React.Fragment>
                    )
                }

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
            <div style={{
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`,
                ...style
            }} className="relative">
                {renderDevices()}
            </div>

        </>

    )
}

export default ADLCanvas