import React, { useMemo, useState } from "react";

import { ArrowCircleRight, ArrowCircleLeft } from "@phosphor-icons/react";
import Button from "../../components/Button";
import Tiled from "../../components/Tiled/Tiled";
import { useNavigate } from "react-router";
import { Table, TableCaption, TableBody, TableCell, TableRow, TableHead, TableHeader } from "@/components/ui/table"
import InputNumber from "@/components/InputNumber";
import ControllerAbsoluteMove from "@/components/ControllerAbsoluteMove";
import ControllerRelativeMove from "@/components/ControllerRelativeMove";
import useOphydSocket from "@/hooks/useOphydSocket";

export default function About() {
    const wsUrl = useMemo(()=>'ws://localhost:8000/ophydSocket', []);
    const deviceNameList = useMemo(()=>['IOC:m1', 'IOC:m2', 'IOC:m3'], []);

    const { devices, handleSetValueRequest, toggleDeviceLock, toggleExpand } = useOphydSocket(wsUrl, deviceNameList);
    const navigate = useNavigate();
    return (
        <div className="">
            <p className="text-sky-600">About</p>
            <Button text="sample page" cb={()=> {navigate('/samplepage1')}}/>
            <Button text="qserver" cb={()=> {navigate('/qserver')}}/>
            <Table className="max-w-[1000px] m-auto bg-neutral-50 border border-neutral-200" >
                <TableCaption>Ophyd Devices.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-64">Device Name</TableHead>
                    <TableHead className="text-center">Current Value</TableHead>
                    <TableHead className="text-left">Absolute Move</TableHead>
                    <TableHead className="text-center">Relative Move</TableHead>
                    </TableRow>
                </TableHeader>
                    <TableBody>
                        {
                            Object.keys(devices).map((deviceName) => {
                                const device = devices[deviceName];
                                return (
                                    <TableRow key={deviceName} className="">
                                        <TableCell 
                                            className="hover:cursor-pointer py-5" 
                                            onClick={()=>toggleExpand(deviceName, device.locked)}
                                        >
                                            <>
                                                <p>{deviceName}</p>
                                                {device.expanded && <pre className="text-xs">{JSON.stringify(device, null, 2)}</pre>}
                                            </>
                                        </TableCell>
                                        <TableCell className="text-center text-md">
                                            {`${device.value} ${device.units ? device.units.slice(0, 3) : 'n/a'}`}
                                        </TableCell>
                                        <TableCell className="">
                                            <ControllerAbsoluteMove 
                                                handleEnter={(input)=>input!==null && handleSetValueRequest(deviceName, input)} 
                                                inputLabel={device.units && device.units.slice(0,3)}
                                            />
                                        </TableCell>
                                        <TableCell className="flex justify-center items-center">
                                            <ControllerRelativeMove 
                                                handleEnter={(input)=>input!==null && handleSetValueRequest(deviceName, input)} 
                                                inputLabel={device.units && device.units.slice(0,3)} 
                                                currentValue={typeof device.value === 'number' ? device.value : null}
                                            />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            {/* <div>
                <Tiled onSelectCallback={(links:any) => console.log(links)} isPopup={true} closeOnSelect={true}/>
            </div> */}
        </div>
    )
}