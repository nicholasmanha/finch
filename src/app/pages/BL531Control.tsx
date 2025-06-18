import { useMemo } from 'react';

import CameraContainer from '@/components/Camera/CameraContainer';
import DeviceControllerBox from '@/components/DeviceControllerBox';
import useOphydSocket from '@/hooks/useOphydSocket';
import Paper from '@/components/Paper';
import Bento from '@/components/Bento';
import SignalMonitorPlot from '@/components/SignalMonitorPlot';
import { deviceIcons } from '@/assets/icons';

export default function BL531Control() {
    const wsUrl = useMemo(()=>'ws://localhost:8000/ophydSocket', []);
    const deviceNameList = useMemo(()=>['IOC:m1', 'IOC:m2'], []);
    const { devices, handleSetValueRequest, toggleDeviceLock, toggleExpand } = useOphydSocket(wsUrl, deviceNameList);

    return (
        <Bento>
            <div className="flex flex-col gap-8 flex-shrink-0 h-full justify-start">
                <SignalMonitorPlot pv="cmm:beam_current" className="h-60 rounded-lg" pollingIntervalMilliseconds={1000}/>
                <DeviceControllerBox 
                    device={devices['IOC:m1']} 
                    handleSetValueRequest={handleSetValueRequest} 
                    handleLockClick={toggleDeviceLock} 
                    
                    className="shadow-xl"
                />

            </div>
            {/* <Paper title="Camera" size="grow">
                <CameraContainer prefix="13SIM1" enableControlPanel={true} enableSettings={true} canvasSize="medium"/>
            </Paper> */}
        </Bento>

    )
}