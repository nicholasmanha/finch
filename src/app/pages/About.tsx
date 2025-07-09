import { useNavigate } from "react-router";

import Paper from "@/components/Paper";
import PlotlyScatter from "@/components/PlotlyScatter";
import SignalMonitorPlot from "@/components/SignalMonitorPlot";
import Plot, { PlotParams } from 'react-plotly.js';
import ADLView from "@/components/ADLController/ADLView";
import { cameraDeviceData } from "@/components/Camera/utils/cameraDeviceData";
import CameraContainer from "@/components/Camera/CameraContainer";
import ADLController from "@/components/ADLController/ADLController";



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
        <div className="flex">

       
            <ADLController fileName="simDetector.adl" P="Basler5472" R="cam1"/>
            <CameraContainer prefix="Basler5472" enableControlPanel={false} enableSettings={false}/>
            </div>
        </>
        
    )
}