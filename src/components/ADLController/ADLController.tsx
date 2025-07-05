import { useState, useEffect } from "react";
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
  const STORAGE_KEY = `adl-tabs-${fileName}`; // Unique key per file
  const ACTIVE_TAB_KEY = `adl-active-tab-${fileName}`;

  // Function to load tabs from localStorage
  const loadTabsFromStorage = (): TabData[] => {
    try {
      const storedTabs = localStorage.getItem(STORAGE_KEY);
      if (storedTabs) {
        // map stored tabs in localstorage to ADLViews
        const parsedTabs: TabData[] = JSON.parse(storedTabs);
        const mappedTabs = parsedTabs.map((tab) => ({
          id: tab.id,
          label: tab.label,
          fileName: tab.fileName,
          args: tab.args,
          isMainTab: tab.isMainTab,
          content: tab.isMainTab ? null : (
            <ADLView fileName={tab.fileName!} {...tab.args} />
          ),
        }));

        // Check if a tab with the current fileName exists
        const hasMainTab = mappedTabs.some(tab => tab.fileName === fileName);
        
        if (!hasMainTab) {
          // Add the main tab if it doesn't exist
          const mainTab: TabData = {
            id: "tab1",
            label: fileName,
            content: <ADLView fileName={fileName} P={P} R={R} />,
            fileName,
            args: { P, R },
            isMainTab: true,
          };
          return [mainTab, ...mappedTabs];
        }

        return mappedTabs;
      }
    } catch (error) {
      console.error("Error loading tabs from localStorage:", error);
    }

    // Return default tab if no stored tabs or error
    return [
      {
        id: "tab1",
        label: fileName,
        content: <ADLView fileName={fileName} P={P} R={R} />,
        fileName,
        args: { P, R },
        isMainTab: true,
      },
    ];
  };

  // Function to save tabs to localStorage
  const saveTabsToStorage = (tabsToSave: TabData[]) => {
    try {
      const storedTabs: TabData[] = tabsToSave.map((tab) => ({
        id: tab.id,
        label: tab.label,
        fileName: tab.fileName,
        args: tab.args,
        isMainTab: tab.isMainTab,
      }));

      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedTabs));
    } catch (error) {
      console.error("Error saving tabs to localStorage:", error);
    }
  };

  // Initialize tabs from localStorage
  const [tabs, setTabs] = useState<TabData[]>(() => loadTabsFromStorage());

  // Load active tab from localStorage
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const storedActiveTab = localStorage.getItem(ACTIVE_TAB_KEY);
      // returns true if at least one element is the active tab
      if (storedActiveTab && tabs.some((tab) => tab.id === storedActiveTab)) {
        return storedActiveTab;
      }
    } catch (error) {
      console.error("Error loading active tab from localStorage:", error);
    }
    return tabs[0]?.id || "tab1";
  });

  // Save tabs to localStorage whenever tabs change
  useEffect(() => {
    saveTabsToStorage(tabs);
  }, [tabs]);

  // Save active tab to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_TAB_KEY, activeTab);
    } catch (error) {
      console.error("Error saving active tab to localStorage:", error);
    }
  }, [activeTab]);

  const removeTab = (tabId: string) => {
    const tabToRemove = tabs.find((tab) => tab.id === tabId);

    // Prevent deletion if the tab filename matches the component's prop filename
    if (tabToRemove && tabToRemove.fileName === fileName) {
      return;
    }

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

  const addTabWithContent = (
    label: string,
    content: React.ReactNode,
    fileName?: string,
    args?: Record<string, any>
  ) => {
    const newId = `tab${Date.now()}`;
    const newTab: TabData = {
      id: newId,
      label,
      content,
      fileName,
      args,
      isMainTab: false,
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
            {tab.isMainTab ? (
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