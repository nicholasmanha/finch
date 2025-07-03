import { CSSProperties } from 'react'
import { Device } from "@/types/deviceControllerTypes";
import { Entry } from './types/ADLEntry';
import InputInteger from './InputNumber';
import InputEnum from './InputEnum';
import ADLButton from './ADLButton';
import InputText from './InputText';
import RelatedDisp from './RelatedDisp';

export type DeviceRenderProps = {
    PV: Device;
    ADLEntry: Entry;
    [key: string]: any;
    onSubmit: (pv: string, value: string | boolean | number) => void
}

function DeviceRender({ PV, ADLEntry, onSubmit, ...args }: DeviceRenderProps) {
    if (!PV) return;
    const pv = PV.name
    const handleSubmitWithPV = (newValue: string | number | boolean) => {
        onSubmit(pv, newValue); 
    };

    const renderInput = () => {
        const positionStyle: CSSProperties = {
            left: `${ADLEntry.location.x}px`,
            top: `${ADLEntry.location.y}px`,
            width: `${ADLEntry.size.width}px`,
            height: `${ADLEntry.size.height}px`,
            position: 'absolute'
        };
        switch (ADLEntry.var_type) {
            case "entry":
                
                if (ADLEntry.format === 'string' || typeof PV.value === 'string') {
                    return <InputText val={PV.value} onSubmit={handleSubmitWithPV} style={positionStyle} />;
                }
                else {
                    return <InputInteger val={PV.value} onSubmit={handleSubmitWithPV} style={positionStyle} />;
                }
            case "update":
                
                if (typeof PV.value === 'number') {
                    // if update value is for an enum
                    if (PV.enum_strs) {
                        return <div style={positionStyle}>{PV.enum_strs[PV.value]}</div>
                    }
                    // if update value is just a number
                    return <div style={positionStyle}>{PV.value.toFixed(2)}</div>
                }
                // if update value is a string
                else {
                    return <div style={positionStyle}>{PV.value}</div>
                }

            case "menu":
                return <InputEnum val={PV.value} enums={PV.enum_strs} onSubmit={handleSubmitWithPV} style={positionStyle} />
            case "button":
                return <ADLButton label={ADLEntry.label} val={parseInt(ADLEntry.press_msg!)} onSubmit={handleSubmitWithPV} style={positionStyle} />
            case "related display":
                return <RelatedDisp fileArray={ADLEntry.display} label={ADLEntry.label} style={positionStyle} {...args}/>
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