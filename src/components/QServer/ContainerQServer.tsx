//import QItemPopup from "./QItemPopup";
import QItemPopup from "./QItemPopup";
import SidePanel from "./SidePanel";
import MainPanel from "./MainPanel";
import SettingsContainer from "./SettingsContainer";
import QSConsole from "./QSConsole";
import QSAddItem from "./QSAddItem";
import { tailwindIcons } from "src/assets/icons";
import QSList from "./QSList";
import QSRunEngineWorker from "./QSRunEngineWorker";
import { getStatus, getQueueItem, openWorkerEnvironment } from "./utils/apiClient";
import { useState,  useEffect, } from 'react';
import { useQueueServer } from "./hooks/useQueueServer";
import { CopiedPlan, PopupItem } from "./types/types";
import { GetQueueItemResponse, GetStatusResponse } from "./types/apiTypes";


export default function QueueServer() {

    const [ isQItemPopupVisible, setIsQItemPopupVisible ] = useState(false);
    const [ popupItem, setPopupItem ] = useState<PopupItem | null>(null);
    const [ isItemDeleteButtonVisible, setIsItemDeleteButtonVisible ] = useState(true);
    const [ copiedPlan, setCopiedPlan ] = useState<CopiedPlan | null>(null);
    const [ isSidepanelExpanded, setIsSidepanelExpanded ] = useState(false);
    const [ minimizeAllWidgets, setMinimizeAllWidgets ] = useState(false);
    
    const {
        currentQueue,
        queueHistory,
        isREToggleOn,
        runningItem,
        setIsREToggleOn,
        processConsoleMessage,
        globalMetadata,
        updateGlobalMetadata,
        removeDuplicateMetadata,
        isGlobalMetadataChecked,
        handleGlobalMetadataCheckboxChange
    } = useQueueServer();

   /*  const handleOpenQItemPopup = (data:GetQueueItemResponse, showDeleteButton=true) => {
        if (data.success !== false) {
            //set popup to visible
            if (data.item) {
                //occurs on GET request
                setPopupItem(data.item); //popup item takes the raw item properties from GET request
            } else {
                //occurs when item is sent in directly
                setPopupItem(data);
                showDeleteButton ? setIsItemDeleteButtonVisible(true) : setIsItemDeleteButtonVisible(false);
            }
            setIsQItemPopupVisible(true);
        } else {
            console.log('No item found in "get queue item" response');
        }
    }

    const handleQItemClick = (arg, showDeleteButton=true) => {
        //until httpserver queue/item/get endpoint is fixed,
        //populate the item popup with the existing data.
        //It is better to do a 'GET' on item UID in case the item parameters
        //have been changed by a user on another workstation and the data is stale
        if (typeof arg === 'string') {
            //sent in a uid, do a get request
            getQueueItem(arg, handleOpenQItemPopup);
        } else {
            //entire item has been sent in
            handleOpenQItemPopup(arg, showDeleteButton);
        }
    }; */

    //create a handleCurrentQitemClick and handleHisotryQItemClick
    const handleCurrentQItemClick = (item:PopupItem) => {
        setPopupItem(item);
        setIsItemDeleteButtonVisible(true);
        setIsQItemPopupVisible(true);
    };

    const handleHistoryQItemClick = (item:PopupItem) => {
        setPopupItem(item);
        setIsQItemPopupVisible(true);
    }

    const handleQItemPopupClose = () => {
        setIsQItemPopupVisible(false);
        setPopupItem(null);
    };

    const handleSidepanelExpandClick = (isSidepanelExpanded:boolean) => {
        if (isSidepanelExpanded) {
            setIsSidepanelExpanded(false);
            //expand all widgets on the main panel
            setMinimizeAllWidgets(false);
        } else {
            setIsSidepanelExpanded(true);
            //minimize all widgets on the main panel
            setMinimizeAllWidgets(true);
        }
    };

/**
 * Sets the copiedPlan state variable which triggers the plan and parameters to be updated in QSAddItem
 * 
 * @param {string} name - String value representing the name of the plan
 * @param {object} parameters - Object of format {key1: value1, key2: value2, ...}
 * // The values may be string, array, or objects
 */
    const handleCopyItemClick = (name='', parameters={}) => {
        //updates the state variables in QSAddItem
        var plan = {
            name: name,
            parameters: parameters
        };
        var sanitizedPlan = removeDuplicateMetadata(plan);
        setCopiedPlan(sanitizedPlan);
    };

    useEffect(() => {
        //check if the re worker has opened or not with GET
        const checkWorkerEnvironment = (res:GetStatusResponse) => {
            if (res.worker_environment_exists === false || res.worker_environment_state === 'closed') {
                console.log('RE worker environment closed, attempting to open a new worker environment');
                openWorkerEnvironment();
            }
        }
        getStatus(checkWorkerEnvironment);
    }, [])

    return (
        <main className="max-w-screen-3xl w-full min-w-[52rem] h-[calc(100vh-6rem)] min-h-[50rem]  m-auto flex rounded-md relative bg-slate-400 border ">
            {/* ITEM POPUP  */}
            {(isQItemPopupVisible && popupItem!==null) && (
                <QItemPopup 
                    handleQItemPopupClose={handleQItemPopupClose} 
                    popupItem={popupItem} 
                    isItemDeleteButtonVisible={isItemDeleteButtonVisible} 
                    handleCopyItemClick={handleCopyItemClick} 
                />
            )} 
            <div className={`${isSidepanelExpanded ? 'w-4/5' : 'w-1/5 '}  flex-shrink-0 transition-all duration-300 ease-in-out bg-slate-200 rounded-md shadow-md drop-shadow h-full`}>
                <SidePanel 
                    queueData={currentQueue?.items || []}
                    queueHistoryData={queueHistory?.items || []} 
                    isREToggleOn={isREToggleOn} 
                    handleSidepanelExpandClick={handleSidepanelExpandClick}
                    isSidepanelExpanded={isSidepanelExpanded}
                >
                    <QSList type="short" queueData={currentQueue?.items || []} handleQItemClick={handleCurrentQItemClick}/>
                    <QSRunEngineWorker runningItem={runningItem} isREToggleOn={isREToggleOn} setIsREToggleOn={setIsREToggleOn}/>
                    <QSList type="history" queueData={queueHistory?.items || []} handleQItemClick={handleHistoryQItemClick}/>
                </SidePanel>
            </div>

            <div className="flex-grow bg-slate-400 rounded-md">
                <MainPanel minimizeAllWidgets={minimizeAllWidgets} expandPanel={handleSidepanelExpandClick} isSidePanelExpanded={isSidepanelExpanded}>
                    <SettingsContainer 
                        title="Settings" 
                        icon={tailwindIcons.cog} 
                        expandedHeight="h-1/2" 
                        defaultHeight="h-1/4" 
                        maxHeight="max-h-[30rem]" 
                        isGlobalMetadataChecked={isGlobalMetadataChecked} 
                        handleGlobalMetadataCheckboxChange={handleGlobalMetadataCheckboxChange} 
                        globalMetadata={globalMetadata} 
                        updateGlobalMetadata={updateGlobalMetadata}/>
                    <QSAddItem 
                        title="Add Item" 
                        icon={tailwindIcons.plus} 
                        expandedHeight="h-5/6" 
                        defaultHeight="h-1/2" 
                        maxHeight="max-h-[50rem]" 
                        copiedPlan={copiedPlan} 
                        isGlobalMetadataChecked={isGlobalMetadataChecked} 
                        globalMetadata={globalMetadata}/> 
                    <QSConsole 
                        title="Console Output" 
                        icon={tailwindIcons.commandLine} 
                        expandedHeight="h-3/4" 
                        defaultHeight="h-[22%]" 
                        processConsoleMessage={processConsoleMessage}/> 
                </MainPanel>
            </div>
        </main>
    )
}

