import React, { useContext, useState } from 'react'
import { Device } from "@/types/deviceControllerTypes";
import { Entry } from './types/ADLEntry';
import InputField from '../Camera/InputField';
import InputInteger from './InputNumber';
import InputEnum from './InputEnum';
import ADLButton from './ADLButton';

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
        if (typeof PV.value === 'number') {
            switch (ADLEntry.var_type) {
                case "entry":
                    return <InputInteger val={PV.value} onSubmit={handleSubmitWithPV} style={{ left: `${ADLEntry.location.x}px`, top: `${ADLEntry.location.y}px`, width: `${ADLEntry.size.width}px`, height: `${ADLEntry.size.height}px`, position: 'absolute' }}/>;
                case "update":
                    return <div className="absolute"
                        style={{ left: `${ADLEntry.location.x}px`, top: `${ADLEntry.location.y}px`, width: `${ADLEntry.size.width}px`, height: `${ADLEntry.size.height}px` }}>{PV.value.toFixed(2)}</div>
                case "menu":
                    return <InputEnum val={PV.value} enums={PV.enum_strs} onSubmit={handleSubmitWithPV} style={{ left: `${ADLEntry.location.x}px`, top: `${ADLEntry.location.y}px`, width: `${ADLEntry.size.width}px`, height: `${ADLEntry.size.height}px`, position: 'absolute' }}/>
                case "button":
                    return <ADLButton label={ADLEntry.label}  val={parseInt(ADLEntry.press_msg ? ADLEntry.press_msg : '')} onSubmit={handleSubmitWithPV} style={{ left: `${ADLEntry.location.x}px`, top: `${ADLEntry.location.y}px`, width: `${ADLEntry.size.width}px`, height: `${ADLEntry.size.height}px`, position: 'absolute' }}/>
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