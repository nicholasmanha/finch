import { useState} from "react";
import { TabsGroup } from '@/components/Tabs/TabsGroup';
import { TabsList } from '@/components/Tabs/TabsList';
import { Tab } from '@/components/Tabs/Tab';
import { TabsPanel } from '@/components/Tabs/TabsPanel';
import { TabData } from "../Tabs/types/tabs";
import { TabManagementProvider } from "../Tabs/context/TabsContext";
import ADLView from "./ADLView";


export type ADLControllerProps = {
  className?: string;
  fileName: string;
  P: string;
  R: string
}

export default function ADLController({ className, fileName, P, R }: ADLControllerProps) {
  // useState to dynamically render tabs
  const [tabs, setTabs] = useState<TabData[]>([
    { id: 'tab1', label: fileName, content: null } // placeholder
  ]);
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || 'tab1');

  const removeTab = (tabId: string) => {
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    
    // If we're removing the active tab, switch to the first remaining tab
    if (activeTab === tabId && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
    }
  };

  const addTabWithContent = (label: string, content: React.ReactNode) => {
    const newId = `tab${Date.now()}`;
    const newTab: TabData = {
      id: newId,
      label,
      content
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newId); // Set new tab as active
  };

  const tabManagementValue = {
    addTab: addTabWithContent,
    removeTab,
    tabs,
    activeTab,
    setActiveTab
  };


  return (
  <TabManagementProvider value={tabManagementValue}>
    <TabsGroup value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        {tabs.map((tab) => (
          <div key={tab.id} className="flex items-center">
            <Tab value={tab.id}>{tab.label}</Tab>
            <button
              onClick={() => removeTab(tab.id)}
              className="ml-2 text-red-500 hover:text-red-700 text-4xl"
            >
              x
            </button>
          </div>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <div 
          key={tab.id} 
          style={{ display: activeTab === tab.id ? 'block' : 'none' }}
        >
          {tab.id === 'tab1' ? (
            <ADLView className="mt-4" fileName={fileName} P={P} R={R}/>
          ) : (
            tab.content
          )}
        </div>
      ))}
    </TabsGroup>
  </TabManagementProvider>
);

}
