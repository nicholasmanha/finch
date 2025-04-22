import { useState } from "react";
import { Lock, LockOpen, ArrowsInSimple, QuestionMark } from "@phosphor-icons/react";

import { Device } from "@/types/deviceControllerTypes";
import ControllerAbsoluteMove from "../ControllerAbsoluteMove";
import ControllerRelativeMove from "../ControllerRelativeMove";
import InputNumber from "../InputNumber";
import Button from "../Button";
import { controllerIcons } from "@/assets/icons";

type DeviceControllerBoxProps = {
    device: Device;
    handleSetValueRequest: (deviceName: string, value: number) => void;
    handleLockClick: (deviceName: string) => void;
    handleMinimizeClick: (deviceName: string) => void;
    svgIcon?: React.ReactNode;
}

export default function DeviceControllerBox({ device, handleSetValueRequest, handleLockClick, handleMinimizeClick, svgIcon }: DeviceControllerBoxProps) {
    if (!device) return;
    const backgroundColorClass = device.locked ? 'bg-slate-400' : 'bg-slate-100';
    const [ absoluteMoveValue, setAbsoluteMoveValue ] = useState<number | null>(null);
    const [ relativeMoveIncrement, setRelativeMoveIncrement ] = useState<number | null>(null);

    const formattedCurrentValue = `${typeof device.value === 'number' ? device.value.toPrecision(4) : device.value} ${device.units?.slice(0,3)}`;
    const handleIncrementClick = () => {
        if (relativeMoveIncrement !== null && typeof device.value === 'number') {
            handleSetValueRequest(device.name, relativeMoveIncrement + device.value);
        }
    };
    const handleDecrementClick = () => {
        if (relativeMoveIncrement !== null && typeof device.value === 'number') {
            handleSetValueRequest(device.name, device.value - relativeMoveIncrement);
        }
    };
    return (
        <article className={`w-96 border border-slate-300 rounded-xl flex flex-col ${backgroundColorClass} ${device.locked && 'opacity-60'}`}>
            <div className="flex justify-between px-2 py-2 flex-shrink-0">
                <div className="h-12 aspect-square bg-white rounded-full border border-slate-500 flex justify-center items-center">
                    {device.locked 
                        ? 
                            <Lock 
                                size={24} 
                                className="text-slate-900 hover:text-green-900 hover:cursor-pointer" 
                                onClick={()=>handleLockClick(device.name)}
                            /> 
                        : 
                            <LockOpen 
                                size={24} 
                                className="text-slate-500 hover:text-red-900 hover:cursor-pointer" 
                                onClick={()=>handleLockClick(device.name)}
                            />
                    }
                </div>
                <div className="aspect-square h-12 text-slate-600">
                    {svgIcon && svgIcon}
                </div>
                <div className="h-12 aspect-square bg-white rounded-full border border-slate-500 flex justify-center items-center">
                    <QuestionMark size={24} className="text-slate-500" onClick={() => handleMinimizeClick(device.name)} />
                </div>
            </div>
            <div className="flex justify-center items-center">
                <p className="text-3xl text-slate-800">{device.name}</p>
            </div>
            <div className="flex justify-center items-center ">
                <p className="text-5xl py-4">{formattedCurrentValue}</p>
            </div>
            <div className="flex justify-center items-center py-8 space-x-4">
                <InputNumber 
                    label={device.units && device.units.slice(0,3)}
                    labelPosition='right' 
                    className={`w-28`} 
                    handleEnter={(input)=>input!==null && handleSetValueRequest(device.name, input)}  
                    onChange={(input) => setAbsoluteMoveValue(input)} 
                    inputClassName="text-right"
                    disabled={device.locked}
                />
                <Button 
                    text="set" 
                    cb={()=>absoluteMoveValue!==null && handleSetValueRequest(device.name, absoluteMoveValue)} 
                    size="small"
                    disabled={device.locked}
                />

            </div>
            <div className="bg-[#A4CEF8] py-4 flex justify-center rounded-b-xl space-x-6">
                <div 
                    className={`h-16 aspect-square text-white hover:text-slate-100  ${device.locked ? 'hover:cursor-not-allowed': 'hover:cursor-pointer'}`}
                    onClick={!device.locked ? handleDecrementClick : ()=>{}}
                >
                    {controllerIcons.leftArrowMinus}
                </div>
                <div className="flex flex-col items-center relative">
                    <p className="absolute top-0 -left-3  z-10 text-slate-700">-+</p>
                    <InputNumber 
                        onChange={(input) => setRelativeMoveIncrement(input)}
                        inputClassName={`w-20`}
                        disabled={device.locked}
                    />
                    <p className="text-slate-700">{formattedCurrentValue}</p>
                </div>
                <div 
                    className={`h-16 aspect-square text-white hover:text-slate-100  ${device.locked ? 'hover:cursor-not-allowed': 'hover:cursor-pointer'}`}
                    onClick = {!device.locked ? handleIncrementClick : ()=>{}}
                >
                    {controllerIcons.rightArrowPlus}
                </div>

            </div>
        </article>
    )
}