import React, { useMemo, useState } from "react";


import Button from "../../components/Button";
import Tiled from "../../components/Tiled/Tiled";
import { useNavigate } from "react-router";
import TableDeviceController from "@/components/TableDeviceController";
import DeviceControllerBox from "@/components/DeviceControllerBox";

import useOphydSocket from "@/hooks/useOphydSocket";

export default function About() {
    const wsUrl = useMemo(()=>'ws://localhost:8000/ophydSocket', []);
    const deviceNameList = useMemo(()=>['IOC:m1', 'IOC:m2', 'IOC:m3'], []);

    const { devices, handleSetValueRequest, toggleDeviceLock, toggleExpand } = useOphydSocket(wsUrl, deviceNameList);

    const navigate = useNavigate();
    console.log({devices})
    return (
        <div className="">
            <p className="text-sky-600">About</p>
            <Button text="sample page" cb={()=> {navigate('/samplepage1')}}/>
            <Button text="qserver" cb={()=> {navigate('/qserver')}}/>
            <TableDeviceController devices={devices} handleSetValueRequest={handleSetValueRequest} toggleDeviceLock={toggleDeviceLock} toggleExpand={toggleExpand}/>
            <div className="w-full flex justify-center items-center py-12">
                <DeviceControllerBox device={devices['IOC:m1']} handleSetValueRequest={handleSetValueRequest} handleLockClick={toggleDeviceLock}/>
            </div>
            {/* <div>
                <Tiled onSelectCallback={(links:any) => console.log(links)} isPopup={true} closeOnSelect={true}/>
            </div> */}
        </div>
    )
}