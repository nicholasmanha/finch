import { useState, useEffect, useId } from "react";
import PresentationLayer from "./PresentationLayer";
import CSIControllerContent from "./CSIControllerContent";

export type CSIControllerProps = {
  className?: string;
  fileName?: string;
  P?: string;
  R?: string;
};

// if tab data is in localstorage, load that instead
const getConfigFromLocalStorage = (instanceId: string) => {
  try {
    const storageKey = `csi-tabs-${instanceId}`;
    const csiTabsData = localStorage.getItem(storageKey);
    if (csiTabsData) {
      const tabs = JSON.parse(csiTabsData);
      if (Array.isArray(tabs) && tabs.length > 0) {
        // Find the main tab or use the first tab
        const mainTab = tabs.find(tab => tab.isMainTab) || tabs[0];
        
        if (mainTab && mainTab.fileName && mainTab.args && mainTab.args.P && mainTab.args.R) {
          return {
            fileName: mainTab.fileName,
            P: mainTab.args.P,
            R: mainTab.args.R
          };
        }
      }
    }
    return null;
  } catch (error) {
    console.error('Error parsing csi-tabs from localStorage:', error);
    return null;
  }
};

export default function CSIController({
  className,
  fileName,
  P,
  R,
}: CSIControllerProps) {
  const instanceId = useId(); // uid used for localstorage
  const [configuredProps, setConfiguredProps] = useState<{
    fileName: string;
    P: string;
    R: string;
  } | null>(null); // for dynamically setting args via presentation layer or localstorage

  const [hasCheckedLocalStorage, setHasCheckedLocalStorage] = useState(false);

  // Check localStorage for existing csi-tabs configuration
  useEffect(() => {
    if (!hasCheckedLocalStorage) {
      const existingConfig = getConfigFromLocalStorage(instanceId);
      if (existingConfig) {
        setConfiguredProps(existingConfig);
      }
      setHasCheckedLocalStorage(true);
    }
  }, [hasCheckedLocalStorage, instanceId]);

  // Use configured props if available, otherwise use the passed props
  const finalFileName = configuredProps?.fileName || fileName;
  const finalP = configuredProps?.P || P;
  const finalR = configuredProps?.R || R;

  // Show loading state while checking localStorage
  if (!hasCheckedLocalStorage) {
    return <div>Loading...</div>;
  }

  // If any required props are missing, render the dialog
  if (!finalFileName || !finalP || !finalR) {
    return (
      <PresentationLayer
        onSubmit={(fileName, P, R) => {
          setConfiguredProps({ fileName, P, R });
        }}
      />
    );
  }

  // Once we have all props, render the actual controller
  return (
    <CSIControllerContent
      className={className}
      fileName={finalFileName}
      P={finalP}
      R={finalR}
      instanceId={instanceId}
    />
  );
}