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
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const renderDevices = () => {

        return ADLData.map((device: Entry, index: number) => {
            const canvasStyle = {
                position: 'absolute' as const,  // The 'as const' ensures TypeScript knows it's a literal
                left: `${device.location.x}px`,
                top: `${device.location.y}px`,
            };
            switch (device.var_type) {
                case "text":
                    if (device.dynamic_attribute) {

                        let pv = `${P}:${R}:${extractPVName(device.dynamic_attribute.chan)}`;
                        return (
                            <React.Fragment key={index}>
                                <StyleRender ADLEntry={device} dynamic={true} val={devices[pv]?.value} vis={device.dynamic_attribute.vis} />
                            </React.Fragment>
                        )
                    }
                    else {
                        return (
                            <React.Fragment key={index}>
                                <StyleRender ADLEntry={device} dynamic={false} />
                            </React.Fragment>
                        );
                    }

                case "display":
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
                    break;
                case "composite":
                    if (device.comp_file !== undefined) {
                        // if given ADSetup.adl, this returns ADSetup
                        const objectName = device.comp_file.split('.')[0];

                        // this is the actual ADL file from detecetorSetup (which represents all contents of the adl folder)
                        const component = detectorSetup.default[objectName as keyof typeof detectorSetup];

                        // parsed version of the adl file
                        const data = ADLParser(parseCustomFormat(component))

                        // ws call
                        var deviceNames = useMemo(() => createDeviceNameArray(data), []);
                        const wsUrl = useMemo(() => 'ws://localhost:8000/ophydSocket', []);
                        const { devices, handleSetValueRequest, } = useOphydSocket(wsUrl, deviceNames);
                        const onSubmitSettings = useCallback(handleSetValueRequest, []);
                        return (
                            <React.Fragment key={index}>
                                <ADLCanvas ADLData={data} devices={devices} onSubmit={onSubmitSettings} style={canvasStyle} />
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
                default:
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