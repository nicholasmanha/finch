import { useNavigate } from "react-router";

import Paper from "@/components/Paper";
import PlotlyScatter from "@/components/PlotlyScatter";
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
                
                <p className="text-lg text-center mt-4">
                    This is a sample application demonstrating the use of React Router and Tailwind CSS.
                </p>
                <PlotlyScatter data={data} className="h-4/5 w-4/5" xAxisRange={[0, 100]}/>

            </Paper>

    )
}