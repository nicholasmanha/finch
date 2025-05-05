import { useMemo, useCallback, useEffect, useState } from "react";

import useOphydSocket from "@/hooks/useOphydSocket";
import PlotlyScatter from "./PlotlyScatter";
import { PlotlyScatterData } from "@/types/plotTypes";
import { Datum } from "plotly.js";
import { i } from "react-router/dist/development/route-data-aSUFWnQ6";

const generateSampleData = (numPoints: number): PlotlyScatterData => {
    const now = Date.now(); // Current timestamp in milliseconds
    const interval = 1000; // 1 second interval between points
    const x = Array.from({ length: numPoints }, (_, i) => new Date(now - (numPoints - i) * interval).toISOString());
    const y = Array.from({ length: numPoints }, () => Math.random() * 100); 
    return {
        x,
        y,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red' },
    };
};

const blankData: PlotlyScatterData = {
        x: [],
        y: [],
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red', size: [] },
};

//const sampleData: PlotlyScatterData = generateSampleData(30) // 30 points of sample data
export type SignalMonitorPlotProps = {
    className?: string;
    numVisiblePoints?: number;
    pollingInterval?: number;
    demo?: boolean;
}
export default function SignalMonitorPlot({
    className,
    numVisiblePoints = 30,
    pollingInterval = 1000,
    demo=false,
}: SignalMonitorPlotProps) {
    const wsUrl = useMemo(()=>'ws://localhost:8000/ophydSocket', []);
    const deviceNameList = useMemo(()=>['IOC:m1'], []);
    const { devices } = useOphydSocket(wsUrl, deviceNameList);  //todo: create an optional callback arg that sends update messages into fn
    const [data, setData] = useState<PlotlyScatterData>(demo ? generateSampleData(numVisiblePoints) : blankData);
    const addSinglePoint = useCallback(()=>{
        setData((prevData) => {
            const newXValue = new Date().toISOString();
            const newYValue = Math.random() * 100;
            const newX: Datum[] = [...(prevData.x as Datum[]), newXValue];
            const newY: Datum[] = [...(prevData.y as Datum[]), newYValue];
            if (newX.length > numVisiblePoints) {
                newX.shift();
                newY.shift();
            }
            return {
                    ...prevData,
                    x: newX,
                    y: newY,
            };
        });
    }, []);

    useEffect(() => {
        if (demo) {
            //simulate a new random number every second
            const interval = setInterval(() => {
                addSinglePoint();
            }
            , pollingInterval); // Update every second
            return () => clearInterval(interval);
        } else {
            //get live value from EPICS
            if (!devices || !devices['IOC:m1']) {
                return;
            } else {
                //record the current value immediately to the chart
                let currentValue = devices['IOC:m1'].value;
                if (typeof currentValue !== 'number') return;
                setData((prevData) => {
                    const newXValue = new Date().toISOString();
                    const newYValue = currentValue;
                    const newX: Datum[] = [...(prevData.x as Datum[]), newXValue];
                    const newY: Datum[] = [...(prevData.y as Datum[]), newYValue];
                    const newMarkerSize = prevData.marker ? [...(prevData.marker.size as number[]), 10] : [];
                    if (newX.length > numVisiblePoints) {
                        newX.shift();
                        newY.shift();
                        newMarkerSize.shift();
                    }
                    return {
                            ...prevData,
                            x: newX,
                            y: newY,
                            marker: {...(prevData.marker), size: newMarkerSize},
                    };
                });

                //record the current value at 1 second internval to the chart until the next time it changes
                const interval = setInterval(() => {
                    let currentValue = devices['IOC:m1'].value;
                    if (typeof currentValue !== 'number') return;
                    setData((prevData) => {
                        const newXValue = new Date().toISOString();
                        const newYValue = currentValue;
                        const newX: Datum[] = [...(prevData.x as Datum[]), newXValue];
                        const newY: Datum[] = [...(prevData.y as Datum[]), newYValue];
                        const newMarkerSize = prevData.marker ? [...(prevData.marker.size as number[]), 0] : [];
                        if (newX.length > numVisiblePoints) {
                            newX.shift();
                            newY.shift();
                            newMarkerSize.shift();
                        }
                        return {
                                ...prevData,
                                x: newX,
                                y: newY,
                                marker: {...(prevData.marker), size: newMarkerSize},
                        };
                    });
                }
                ,pollingInterval); // Update every second
                return () => clearInterval(interval);
            }
        }
    }
    , [addSinglePoint, devices]);

    useEffect(()=> {
        console.log('devices changed');
    }, [devices]);

    // useEffect(() => {
    //     return () => {
    //         //cleanup
    //         console.log('SignalMonitorPlot unmounted');
    //         setData({x:[], y:[], type: 'scatter', mode: 'lines+markers', marker: { color: 'red' }});
    //     }
    // }
    // , []);



    // useEffect(() => {
    //     //update the plot data with any new values from EPICS
    //     if (!devices || !devices['IOC:m2']) {
    //         return;
    //     }
    //     let newValue = devices['IOC:m2'].value;
    //     setData((prevData) => {
    //         const newXValue = devices['IOC:m2'].value;
    //         const newYValue = devices['IOC:m2'].value;
    //         if (typeof newXValue !== 'number' || typeof newYValue !== 'number') {
    //             return prevData;
    //         }
    //         const newX: Datum[] = [...(prevData.x as Datum[]), newXValue];
    //         const newY: Datum[] = [...(prevData.y as Datum[]), newYValue];
    //         if (newX.length > numVisiblePoints) {
    //             newX.shift();
    //             newY.shift();
    //         }
    //         return {
    //                 ...prevData,
    //                 x: newX,
    //                 y: newY,
    //         };
    //     });
    //     // setData((prevData) => prevData)
    // }, [devices]);

    return (
        <PlotlyScatter data={[data]} className={className}/>
    )
}