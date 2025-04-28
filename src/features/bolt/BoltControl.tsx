import { useMemo } from 'react';

import CameraContainer from '@/components/Camera/CameraContainer';
import DeviceControllerBox from '@/components/DeviceControllerBox';
import useOphydSocket from '@/hooks/useOphydSocket';
import Paper from '@/components/Paper';
import { deviceIcons } from '@/assets/icons';

export default function BoltControl() {
    const wsUrl = useMemo(()=>'ws://localhost:8000/ophydSocket', []);
    const deviceNameList = useMemo(()=>['IOC:m1', 'IOC:m2', 'IOC:m3'], []);
    const { devices, handleSetValueRequest, toggleDeviceLock, toggleExpand } = useOphydSocket(wsUrl, deviceNameList);

    return (
        <div className="flex flex-wrap p-8 space-x-8 h-full">
            <div className="flex flex-col space-y-8 flex-shrink-0 h-full justify-start">
                <DeviceControllerBox 
                    device={devices['IOC:m1']} 
                    handleSetValueRequest={handleSetValueRequest} 
                    handleLockClick={toggleDeviceLock} 
                    svgIcon={deviceIcons.stepperMotor}
                    className="shadow-xl"
                />
                <DeviceControllerBox 
                    device={devices['IOC:m2']} 
                    handleSetValueRequest={handleSetValueRequest} 
                    handleLockClick={toggleDeviceLock} 
                    svgIcon={deviceIcons.stepperMotor}
                    className="shadow-xl"
                />
            </div>
            <Paper size='large' title="Camera" className='h-full flex-grow'>
                <CameraContainer prefix="13SIM1" enableControlPanel={true} enableSettings={true} canvasSize="medium"/>
            </Paper>
        </div>
    )
}