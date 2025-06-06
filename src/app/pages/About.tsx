import { useNavigate } from "react-router";

import Paper from "@/components/Paper";
import PlotlyScatter from "@/components/PlotlyScatter";
import SignalMonitorPlot from "@/components/SignalMonitorPlot";
import Plot, { PlotParams } from 'react-plotly.js';
import ADLView from "@/components/ADLController/ADLView";
import { cameraDeviceData } from "@/components/Camera/utils/cameraDeviceData";
import CameraContainer from "@/components/Camera/CameraContainer";

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

        <Paper title="About">

            <p className="text-lg text-center mt-4">A testing page for new components</p>
            {/* <PlotlyScatter data={data} className="h-4/5 w-4/5 m-auto" xAxisRange={[0, 100]}/> */}
            
            <p className="text-lg text-center mt-4">ADL VIEW</p>
            <ADLView prefix="13SIM1" enableControlPanel={true} enableSettings={true} canvasSize="medium" customSetup={false} />
            <div className="h-[400px]"></div>
            <h1>CAMERA CONTAINER</h1>
            <CameraContainer prefix="13SIM1" enableControlPanel={true} enableSettings={true} canvasSize="medium" customSetup={false} />
        </Paper>

    )
}