import { useState, useMemo, useEffect } from "react";

import SignalMonitorPlot from "@/components/SignalMonitorPlot";
import DeviceControllerBox from "@/components/DeviceControllerBox";
import useOphydSocket from "@/hooks/useOphydSocket";

export type BeamstopProps = {
    beamstopXName: string,
    beamstopYName: string,
    beamstopCurrentName: string,
}

export default function Beamstop(
    {
        beamstopXName,
        beamstopYName,
        beamstopCurrentName,
    }: BeamstopProps
) {
    const deviceNameList = useMemo(()=>[beamstopXName, beamstopYName, beamstopCurrentName], [beamstopXName, beamstopYName, beamstopCurrentName]);
    const { devices, handleSetValueRequest, toggleDeviceLock, toggleExpand } = useOphydSocket(deviceNameList);
    const [ bestCurrent, setBestCurrent ] = useState<number | null>(null);
    const [bestXValue, setBestXValue] = useState<number | null>(null);
    const [bestYValue, setBestYValue] = useState<number | null>(null);

    useEffect(()=>{
        const currentDevice = devices[beamstopCurrentName];
        const xDevice = devices[beamstopXName];
        const yDevice = devices[beamstopYName];
        if (currentDevice && currentDevice.value !== null && typeof currentDevice.value === "number") {
            if (bestCurrent === null || currentDevice.value > bestCurrent) {
                setBestCurrent(currentDevice.value);
                if (xDevice && xDevice.value !== null && typeof xDevice.value === "number") {
                    setBestXValue(xDevice.value);
                }
                if (yDevice && yDevice.value !== null && typeof yDevice.value === "number") {
                    setBestYValue(yDevice.value);
                }
            }
        }
    }, [devices]);
    return (
        <section className="w-full h-full">
            <article className="w-1/2 bg-white flex flex-col">
                <SignalMonitorPlot pv={beamstopCurrentName} />
                <p>Best Current Value: {bestCurrent}</p>
                <p>Best Beamstop X value: {bestXValue}</p>
                <p>Best Beamstop Y value: {bestYValue}</p>
            </article>
            <article className="w-1/2">
                <DeviceControllerBox device={devices[beamstopXName]} handleLockClick={toggleDeviceLock} handleSetValueRequest={handleSetValueRequest}/>
                <DeviceControllerBox device={devices[beamstopXName]} handleLockClick={toggleDeviceLock} handleSetValueRequest={handleSetValueRequest}/>
            </article>
        </section>
    )
}