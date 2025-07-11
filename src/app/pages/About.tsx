import { useNavigate } from "react-router";

import Paper from "@/components/Paper";
import PlotlyScatter from "@/components/PlotlyScatter";
import SignalMonitorPlot from "@/components/SignalMonitorPlot";
import Plot, { PlotParams } from 'react-plotly.js';
import ADLView from "@/components/ADLController/CSIView";
import { cameraDeviceData } from "@/components/Camera/utils/cameraDeviceData";
import CameraContainer from "@/components/Camera/CameraContainer";
import ADLController from "@/components/ADLController/CSIController";



export default function About() {

    const navigate = useNavigate();
    const data: PlotParams["data"] = [{
        x: [1, 2, 3],
        y: [2, 6, 3],
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red' },
    }];

    
    return (
        <>
            <ADLController fileName="ADBase.bob" P="13SIM1" R="cam1"/>
        </>

    )
}