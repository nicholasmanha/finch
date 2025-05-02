import { useMemo, useEffect, useState } from "react";

import useOphydSocket from "@/hooks/useOphydSocket";
import PlotlyScatter from "./PlotlyScatter";
import { PlotlyScatterData } from "@/types/plotTypes";

const sampleData: PlotlyScatterData = [
    {
        x: [],
        y: [],
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red' },
    },
];

export type SignalMonitorPlotProps = {
    className?: string;
    numVisiblePoints?: number;
}
export default function SignalMonitorPlot({
    className,
    numVisiblePoints = 30,
}: SignalMonitorPlotProps) {
    const wsUrl = useMemo(()=>'ws://localhost:8000/ophydSocket', []);
    const deviceNameList = useMemo(()=>['IOC:m1'], []);
    const { devices } = useOphydSocket(wsUrl, deviceNameList); //todo: create an optional callback arg that sends update messages into fn
    const [data, setData] = useState<PlotlyScatterData>(sampleData);

    useEffect(() => {
        //update the plot data with any new values from EPICS
        let newValue = devices['IOC:m2'].value;
        setData((prevData) => {
            const newX = [...prevData[0].x, devices['IOC:m2'].value];
            const newY = [...prevData[0].y, devices['IOC:m2'].value];
            if (newX.length > numVisiblePoints) {
                newX.shift();
                newY.shift();
            }
            return [
                {
                    ...prevData[0],
                    x: newX,
                    y: newY,
                },
            ];
        });
    }, [devices]);

    return (
        <PlotlyScatter data={data} className={className}/>
    )
}