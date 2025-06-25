import React, { useContext, useState } from 'react'
import { Device } from "@/types/deviceControllerTypes";
import { Entry } from './types/ADLEntry';
import InputField from '../Camera/InputField';
import InputInteger from './InputNumber';
import InputEnum from './InputEnum';
import ADLButton from './ADLButton';
import InputText from './InputText';
import RelatedDisp from './RelatedDisp';

export type DeviceRenderProps = {
    PV: Device;
    ADLEntry: Entry;
    onSubmit: (pv: string, value: string | boolean | number) => void
}



function DeviceRender({ PV, ADLEntry, onSubmit }: DeviceRenderProps) {
    if (!PV) return;

    const pv = PV.name
    const handleSubmitWithPV = (newValue: string | number | boolean) => {
        onSubmit(pv, newValue); //needs a new function for handling enums
    };

    const renderInput = () => {

        switch (ADLEntry.var_type) {
            case "entry":
                if (ADLEntry.format) {

                    return <InputText val={PV.value} onSubmit={handleSubmitWithPV} style={{ left: `${ADLEntry.location.x}px`, top: `${ADLEntry.location.y}px`, width: `${ADLEntry.size.width}px`, height: `${ADLEntry.size.height}px`, position: 'absolute' }} />;
                }
                else {
                    return <InputInteger val={PV.value} onSubmit={handleSubmitWithPV} style={{ left: `${ADLEntry.location.x}px`, top: `${ADLEntry.location.y}px`, width: `${ADLEntry.size.width}px`, height: `${ADLEntry.size.height}px`, position: 'absolute' }} />;
                }
            case "update":
                if (typeof PV.value === 'number') {
                    return <div className="absolute"
                        style={{ left: `${ADLEntry.location.x}px`, top: `${ADLEntry.location.y}px`, width: `${ADLEntry.size.width}px`, height: `${ADLEntry.size.height}px` }}>{PV.value.toFixed(2)}</div>
                }
                else{
                    return <div className="absolute"
                        style={{ left: `${ADLEntry.location.x}px`, top: `${ADLEntry.location.y}px`, width: `${ADLEntry.size.width}px`, height: `${ADLEntry.size.height}px` }}>{PV.value}</div>
                }

            case "menu":
                return <InputEnum val={PV.value} enums={PV.enum_strs} onSubmit={handleSubmitWithPV} style={{ left: `${ADLEntry.location.x}px`, top: `${ADLEntry.location.y}px`, width: `${ADLEntry.size.width}px`, height: `${ADLEntry.size.height}px`, position: 'absolute' }} />
            case "button":
                return <ADLButton label={ADLEntry.label} val={parseInt(ADLEntry.press_msg ? ADLEntry.press_msg : '')} onSubmit={handleSubmitWithPV} style={{ left: `${ADLEntry.location.x}px`, top: `${ADLEntry.location.y}px`, width: `${ADLEntry.size.width}px`, height: `${ADLEntry.size.height}px`, position: 'absolute' }} />
            case "related display":
                if (ADLEntry.label) {
                    return <RelatedDisp label={ADLEntry.label} style={{ left: `${ADLEntry.location.x}px`, top: `${ADLEntry.location.y}px`, width: `${ADLEntry.size.width}px`, height: `${ADLEntry.size.height}px`, position: 'absolute' }} />
                }
                else {
                    return <RelatedDisp label={ADLEntry.label} style={{ left: `${ADLEntry.location.x}px`, top: `${ADLEntry.location.y}px`, width: `${ADLEntry.size.width}px`, height: `${ADLEntry.size.height}px`, position: 'absolute' }} />
                }
            default:
                return <p></p>;
        }

    }

    return (
        <>
            {renderInput()}
        </>
    )
}

export default DeviceRender