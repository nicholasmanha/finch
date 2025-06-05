import React from 'react'
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Lock, LockOpen, QuestionMark } from "@phosphor-icons/react";
import { Device } from "@/types/deviceControllerTypes";
import ControllerAbsoluteMove from "./ControllerAbsoluteMove";
import ControllerRelativeMove from "./ControllerRelativeMove";
import InputNumber from "./InputNumber";
import Button from "./Button";
import { controllerIcons } from "@/assets/icons";

export type BasicInputProps = {
    device: Device;
    handleSetValueRequest: (deviceName: string, value: number) => void;
}

function BasicInput({ device, handleSetValueRequest }: BasicInputProps) {
    const [ absoluteMoveValue, setAbsoluteMoveValue ] = useState<number | null>(null);
    if (!device) return;
    return (
        <>
            <div>name: {device.name} value: {device.value}</div><br></br>
            <InputNumber
                label={device.units && device.units.slice(0, 3)}
                labelPosition='right'
                className={`w-28`}
                handleEnter={(input) => input !== null && handleSetValueRequest(device.name, input)}
                onChange={(input) => setAbsoluteMoveValue(input)}
                inputClassName="text-right"
                disabled={device.locked}
            />
            <Button
                text="set"
                cb={() => absoluteMoveValue !== null && handleSetValueRequest(device.name, absoluteMoveValue)}
                size="small"
                disabled={device.locked}
            />
        </>


    )
}

export default BasicInput