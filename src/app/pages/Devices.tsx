import { useMemo } from "react";
import useOphydSocket from "@/hooks/useOphydSocket";

import DeviceControllerBox from "@/components/DeviceControllerBox";
import { deviceIcons } from "@/assets/icons";

export default function Devices() {
    const wsUrl = useMemo(()=>'ws://localhost:8000/ophydSocket', []);
    const deviceNameList = useMemo(()=>['IOC:m1', 'IOC:m2', 'IOC:m3'], []);

    const { devices, handleSetValueRequest, toggleDeviceLock, toggleExpand } = useOphydSocket(wsUrl, deviceNameList);
    return (
        <div className="w-full h-full flex justify-center items-center py-12">
            <DeviceControllerBox 
                device={devices['IOC:m1']} 
                handleSetValueRequest={handleSetValueRequest} 
                handleLockClick={toggleDeviceLock} 
                handleMinimizeClick={toggleExpand}
                svgIcon={deviceIcons.stepperMotor}
            />
        </div>
    )
}