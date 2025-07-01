import { useNavigate } from "react-router";

import Paper from "@/components/Paper";
import PlotlyScatter from "@/components/PlotlyScatter";
import SignalMonitorPlot from "@/components/SignalMonitorPlot";
import Plot, { PlotParams } from 'react-plotly.js';
import ADLView from "@/components/ADLController/ADLView";
import { cameraDeviceData } from "@/components/Camera/utils/cameraDeviceData";
import CameraContainer from "@/components/Camera/CameraContainer";
import { TabsGroup } from '@/components/Tabs/TabsGroup';
import { TabsList } from '@/components/Tabs/TabsList';
import { Tab } from '@/components/Tabs/Tab';
import { TabsPanel } from '@/components/Tabs/TabsPanel';


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


            <div className="max-w-md mx-auto p-6">
                <TabsGroup defaultValue="tab1">
                    <TabsList>
                        <Tab value="tab1">Overview</Tab>
                        <Tab value="tab2">Details</Tab>
                        <Tab value="tab3">Settings</Tab>
                    </TabsList>

                    <TabsPanel value="tab1">
                        <h3 className="text-lg font-semibold mb-2">Overview</h3>
                        <p className="text-gray-600">
                            This is the overview panel content.
                        </p>
                    </TabsPanel>

                    <TabsPanel value="tab2">
                        <h3 className="text-lg font-semibold mb-2">Details</h3>
                        <p className="text-gray-600">
                            Here are the detailed information.
                        </p>
                    </TabsPanel>

                    <TabsPanel value="tab3">
                        <h3 className="text-lg font-semibold mb-2">Settings</h3>
                        <p className="text-gray-600">
                            Configure your preferences here.
                        </p>
                    </TabsPanel>
                </TabsGroup>
            </div>
        </>

    )
}