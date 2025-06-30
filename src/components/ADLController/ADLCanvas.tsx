import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Devices } from "@/types/deviceControllerTypes";
import { Entry } from './types/ADLEntry';
import StyleRender from './StyleRender';
import DeviceRender from './DeviceRender';
import { ADLParser } from './utils/ADLParse';
import * as ADLs from './utils/adl';
import useOphydSocket from '@/hooks/useOphydSocket';
import { parseCustomFormat } from './utils/ADLtoJSON';

export type ADLCanvasProps = {
    devices: Devices;
    ADLData: any;
    onSubmit?: (pv: string, value: string | boolean | number) => void
    style?: React.CSSProperties;
    P: string;
    R: string;
}

function extractPVName(input: string): string {
    if (!input) return '';

    // Remove all $(...) patterns
    const withoutPrefix = input.replace(/\$\(.*?\)/g, '');

    // Return what remains (or original string if no patterns were found)
    return withoutPrefix || input;
}


const createDeviceNameArray = (Data: Entry[], P: string, R: string) => {

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
    devices: Devices,
    P: string,
    R: string
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

function useDisplaySetup(
    device: Entry,
    setDimensions: (dimensions: { width: number; height: number }) => void
): void {
    useEffect(() => {
        if (device?.size) {
            setDimensions(device.size);
        }
    }, [device, setDimensions]);
}

function renderDeviceComponent(
    ADLEntry: Entry,
    index: number,
    devices: Devices,
    P: string,
    R: string,
    onSubmit: (pv: string, value: string | boolean | number) => void

): React.ReactElement {
    let pv = `${P}:${R}:${extractPVName(ADLEntry.name)}`;

    return (
        <React.Fragment key={index}>
            <DeviceRender PV={devices[pv]} ADLEntry={ADLEntry} onSubmit={onSubmit} />
        </React.Fragment>
    );
}

function renderCompositeDevice(
    device: any, // Replace with your actual device type
    index: number,
    detectorSetup: any, // Replace with your actual detectorSetup type
    P: string,
    R: string,
): JSX.Element | undefined {
    const canvasStyle = {
        position: 'absolute' as const,  // The 'as const' ensures TypeScript knows it's a literal
        left: `${device.location.x}px`,
        top: `${device.location.y}px`,
    };
    // if the composite links to another adl file
    if (device.comp_file !== undefined) {
        // if given ADSetup.adl, this returns ADSetup
        const objectName: string = device.comp_file.split('.')[0];

        // this is the actual ADL file from detecetorSetup (which represents all contents of the adl folder)
        const component = detectorSetup.default[objectName as keyof typeof detectorSetup];

        // parsed version of the adl file
        const data = ADLParser(parseCustomFormat(component));

        // ws call
        const deviceNames = useMemo(() => createDeviceNameArray(data, P, R), []);
        const wsUrl = useMemo(() => 'ws://localhost:8000/ophydSocket', []);
        const { devices, handleSetValueRequest } = useOphydSocket(wsUrl, deviceNames);
        const onSubmitSettings = useCallback(handleSetValueRequest, []);

        return (
            <React.Fragment key={index}>
                <ADLCanvas
                    P={P}
                    R={R}
                    ADLData={data}
                    devices={devices}
                    onSubmit={onSubmitSettings}
                    style={canvasStyle}
                />
            </React.Fragment>
        );
    }
    // if the composite just has children components and not another ADL file
    else if (device.children !== undefined) {
        const deviceNames = useMemo(() => createDeviceNameArray(device.children!, P, R), []);
        const wsUrl = useMemo(() => 'ws://localhost:8000/ophydSocket', []);
        const { devices, handleSetValueRequest } = useOphydSocket(wsUrl, deviceNames);
        const onSubmitSettings = useCallback(handleSetValueRequest, []);

        return (
            <React.Fragment key={index}>
                <ADLCanvas
                    P={P}
                    R={R}
                    ADLData={device.children!}
                    devices={devices}
                    onSubmit={onSubmitSettings}
                    style={{ position: 'absolute' }}
                />
            </React.Fragment>
        );
    }

    return undefined;
}

function ADLCanvas({ ADLData, devices, onSubmit = () => { }, style, P, R }: ADLCanvasProps) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const renderDevices = () => {

        return ADLData.map((device: Entry, index: number) => {
            switch (device.var_type) {
                case "display":
                    useDisplaySetup(device, setDimensions);
                    break;
                case "text":
                    return renderTextComponent(device, index, devices, P, R);
                case "composite":
                    return renderCompositeDevice(device, index, ADLs, P, R);
                default:
                    return renderDeviceComponent(device, index, devices, P, R, onSubmit)
            }
        });
    };
    return (
        <div
            style={{
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`,
                ...style
            }} className="relative">
            {renderDevices()}
        </div>
    )
}

export default ADLCanvas