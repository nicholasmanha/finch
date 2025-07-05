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

// Type for storing tab data in localStorage (without React content)
type StoredTabData = {
  id: string;
  label: string;
  fileName?: string;
  args?: Record<string, any>;
  isMainTab?: boolean;
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
        const parsedTabs: StoredTabData[] = JSON.parse(storedTabs);
        return parsedTabs.map(tab => ({
          id: tab.id,
          label: tab.label,
          content: tab.isMainTab ? null : (
            <ADLView fileName={tab.fileName!} {...(tab.args || {})} />
          )
        }));
      }
    } catch (error) {
      console.error('Error loading tabs from localStorage:', error);
    }
    
    // Return default tab if no stored tabs or error
    return [{ id: "tab1", label: fileName, content: null }];
  };

  // Function to save tabs to localStorage
  const saveTabsToStorage = (tabsToSave: TabData[]) => {
    try {
      const storedTabs: StoredTabData[] = tabsToSave.map(tab => {
        // For the main tab (tab1), we don't need to store args
        if (tab.id === "tab1") {
          return {
            id: tab.id,
            label: tab.label,
            isMainTab: true
          };
        }
        
        // For other tabs, we need to extract the fileName and args from the content
        // This is a bit tricky since we need to reverse-engineer from the React element
        // We'll store this info when creating tabs
        return {
          id: tab.id,
          label: tab.label,
          fileName: (tab as any).fileName || tab.label, // fallback to label
          args: (tab as any).args || {},
          isMainTab: false
        };
      });
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedTabs));
    } catch (error) {
      console.error('Error saving tabs to localStorage:', error);
    }
  };

  // Initialize tabs from localStorage
  const [tabs, setTabs] = useState<TabData[]>(() => loadTabsFromStorage());
  
  // Load active tab from localStorage
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const storedActiveTab = localStorage.getItem(ACTIVE_TAB_KEY);
      if (storedActiveTab && tabs.some(tab => tab.id === storedActiveTab)) {
        return storedActiveTab;
      }
    } catch (error) {
      console.error('Error loading active tab from localStorage:', error);
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
      console.error('Error saving active tab to localStorage:', error);
    }
  }, [activeTab]);

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

  const addTabWithContent = (label: string, content: React.ReactNode, fileName?: string, args?: Record<string, any>) => {
    const newId = `tab${Date.now()}`;
    const newTab: TabData & { fileName?: string; args?: Record<string, any> } = {
      id: newId,
      label,
      content,
      fileName,
      args,
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