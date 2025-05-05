import { useNavigate } from "react-router";

import Paper from "@/components/Paper";
import PlotlyScatter from "@/components/PlotlyScatter";
import SignalMonitorPlot from "@/components/SignalMonitorPlot";
import Plot, { PlotParams } from 'react-plotly.js';


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
                <SignalMonitorPlot className="h-2/5 w-4/5 m-auto" numVisiblePoints={100} pollingInterval={500}/>
                <SignalMonitorPlot className="h-2/5 w-4/5 m-auto" numVisiblePoints={50} pollingInterval={2000}/>

            </Paper>

    )
}