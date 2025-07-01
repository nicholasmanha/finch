import { useMemo, useCallback, CSSProperties, useState } from "react";
import useOphydSocket from "@/hooks/useOphydSocket";
import { simDetector } from './utils/adl';
import { Entry } from "./types/ADLEntry";
import { ADLParser } from "./utils/ADLParse";
import ADLCanvas from "./ADLCanvas";
import { cn } from "@/lib/utils";
import { parseCustomFormat } from "./utils/ADLtoJSON";
import { TabsGroup } from '@/components/Tabs/TabsGroup';
import { TabsList } from '@/components/Tabs/TabsList';
import { Tab } from '@/components/Tabs/Tab';
import { TabsPanel } from '@/components/Tabs/TabsPanel';

export type ADLViewProps = {
  className?: string;
}

export default function ADLView({ className }: ADLViewProps) {

  const P = "13SIM1"
  const R = "cam1"
  const ADLData = ADLParser(parseCustomFormat(simDetector))

  function extractPVName(input: string): string {
    if (!input) return '';

    // Remove all $(...) patterns
    const withoutPrefix = input.replace(/\$\(.*?\)/g, '');

    // Return what remains (or original string if no patterns were found)
    return withoutPrefix || input;
  }

  const createDeviceNameArray = (Data: Entry[]) => {

    var pvArray: string[] = [];
    Data.forEach((group) => {
      let pv = `${P}:${R}:${extractPVName(group.name)}`
      pvArray.push(pv);

    })

    return pvArray;
  };

  interface TabData {
    id: string;
    label: string;
    content: React.ReactNode;
  }

  const [tabs, setTabs] = useState<TabData[]>([
    { id: 'tab1', label: 'Overview', content: 'Overview content' },
    { id: 'tab2', label: 'Details', content: 'Details content' }
  ]);

  const addTab = () => {
    const newId = `tab${tabs.length + 1}`;
    const newTab: TabData = {
      id: newId,
      label: `Tab ${tabs.length + 1}`,
      content: `Content for ${newId}`
    };
    setTabs([...tabs, newTab]);
  };

  const removeTab = (tabId: string) => {
    setTabs(tabs.filter(tab => tab.id !== tabId));
  };

  // array of ex. "13SIM1:cam1:GainRed"
  // settings is cameraDeviceData which is json of data fro PV's for the camera
  var deviceNames = useMemo(() => createDeviceNameArray(ADLData), []);
  const wsUrl = useMemo(() => 'ws://localhost:8000/ophydSocket', []);

  //we need a ws just for the control PV, since a user may only want that one
  //we need another ws just for the settings PVs, in case the user wants those options.
  //or can we just combine them into one?

  const { devices, handleSetValueRequest, } = useOphydSocket(wsUrl, deviceNames);
  const onSubmitSettings = useCallback(handleSetValueRequest, []);
  return (
    <>
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-4">
          <button
            onClick={addTab}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Tab
          </button>
        </div>

        <TabsGroup defaultValue={tabs[0]?.id || 'tab1'}>
          <TabsList>
            {tabs.map((tab) => (
              <div key={tab.id} className="flex items-center">
                <Tab value={tab.id}>{tab.label}</Tab>
                {tabs.length > 1 && (
                  <button
                    onClick={() => removeTab(tab.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsPanel key={tab.id} value={tab.id}>
              {tab.content}
            </TabsPanel>
          ))}
        </TabsGroup>
      </div>
      <div className={cn(
        "inline-block rounded-xl bg-slate-100 p-4",
        className
      )}>
        <ADLCanvas ADLData={ADLData} R={R} P={P} devices={devices} onSubmit={onSubmitSettings} />
      </div>

    </>
  )

}
