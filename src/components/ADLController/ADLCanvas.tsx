import React, { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react'
import { Device, Devices } from "@/types/deviceControllerTypes";
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

function renderTextComponent(
    device: Entry,
    index: number,
    P: string,
    R: string,
    devices: Devices
): React.ReactElement {
    if (device.dynamic_attribute) {
        // turn pv into "13SIM1:cam1:pv"
        const pv = `${P}:${R}:${extractPVName(device.dynamic_attribute.chan)}`;
        return (
            <React.Fragment key={index}>
                <StyleRender
                    ADLEntry={device}
                    dynamic={true}
                    val={devices[pv]?.value}
                    vis={device.dynamic_attribute.vis}
                />
            </React.Fragment>
        );
    }
    
    return (
        <React.Fragment key={index}>
            <StyleRender ADLEntry={device} dynamic={false} />
        </React.Fragment>
    );
}

interface Dimensions {
    width: number;
    height: number;
}

function useDisplaySetup(
    device: Entry,
    setDimensions: (dimensions: Dimensions) => void
): void {

    useEffect(() => {
        if (device?.size) {
            setDimensions(device.size);
        }
    }, [device, setDimensions]);
}

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
                case "display":
                    useDisplaySetup(device, setDimensions);
                    break;
                case "text":
                    return renderTextComponent(device, index, P, R, devices);
                case "composite":
                    // if the composite just has children components and not another ADL file
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