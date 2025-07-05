import { useState } from "react";
import { TabsGroup } from "@/components/Tabs/TabsGroup";
import { TabsList } from "@/components/Tabs/TabsList";
import { Tab } from "@/components/Tabs/Tab";
import { TabsPanel } from "@/components/Tabs/TabsPanel";
import { TabData } from "../Tabs/types/tabs";
import { TabManagementProvider } from "../Tabs/context/TabsContext";
import ADLView from "./ADLView";

export type ADLControllerProps = {
  className?: string;
  fileName: string;
  P: string;
  R: string;
};

export default function ADLController({
  className,
  fileName,
  P,
  R,
}: ADLControllerProps) {
  // useState to dynamically render tabs
  const [tabs, setTabs] = useState<TabData[]>([
    { id: "tab1", label: fileName, content: null }, // placeholder
  ]);
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "tab1");

  const removeTab = (tabId: string) => {
    const currentTabIndex = tabs.findIndex((tab) => tab.id === tabId);
    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);

    // If we're removing the active tab, switch to an appropriate remaining tab
    if (activeTab === tabId && newTabs.length > 0) {
      // If there's a tab to the right, use it
      if (currentTabIndex < newTabs.length) {
        setActiveTab(newTabs[currentTabIndex].id);
      }
      // Otherwise, use the tab to the left (last tab)
      else {
        setActiveTab(newTabs[currentTabIndex - 1].id);
      }
    }
    // If no tabs remain, you might want to handle this case
    else if (newTabs.length === 0) {
      setActiveTab("");
    }
  };
  const addTabWithContent = (label: string, content: React.ReactNode) => {
    const newId = `tab${Date.now()}`;
    const newTab: TabData = {
      id: newId,
      label,
      content,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newId); // Set new tab as active
  };

  const tabManagementValue = {
    addTab: addTabWithContent,
    removeTab,
    tabs,
    activeTab,
    setActiveTab,
  };

  return (
    <TabManagementProvider value={tabManagementValue}>
      <TabsGroup value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {tabs.map((tab) => (
            <div key={tab.id} className="flex items-center">
              <Tab value={tab.id} removeTab={removeTab}>
                {tab.label}
              </Tab>
            </div>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <div
            key={tab.id}
            style={{ display: activeTab === tab.id ? "block" : "none" }}
          >
            {tab.id === "tab1" ? (
              <ADLView fileName={fileName} P={P} R={R} />
            ) : (
              tab.content
            )}
          </div>
        ))}
      </TabsGroup>
    </TabManagementProvider>
  );
}
