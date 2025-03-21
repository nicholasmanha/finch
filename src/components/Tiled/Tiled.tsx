import { useState } from "react";
import TiledHeader from "./TiledHeader";
import TiledColumns from "./TiledColumns";
import TiledPreview from "./TiledPreview";
import TiledFooter from "./TiledFooter";
import TiledBody from "./TiledBody";
import TiledContainer from "./TiledContainer";
import StartupScreen from "./StartupScreen";
import './Tiled.css'

import { TiledSearchItem, TiledStructures } from "./types";
import { generateLinksForCallback } from "./utils";

import { useTiled } from './useTiled';

export type TiledProps = {
    onSelectCallback?: Function,
    closeOnSelect?: boolean,
    isPopup?: boolean,
    enableStartupScreen?: boolean,
    tiledBaseUrl?: string
}
export default function Tiled({
    onSelectCallback,
    closeOnSelect=false,
    isPopup,
    enableStartupScreen=false,
    tiledBaseUrl,
    ...props
}: TiledProps) {
    const [ isClosed, setIsClosed ] = useState<boolean>(false);
    const [ showStartupScreen, setShowStartupScreen ] = useState<boolean>(true);
    const [ url, setUrl ] = useState<undefined | string>(tiledBaseUrl);

/*     const { 
        columns, 
        breadcrumbs,
        previewItem,
        previewSize,
        handleColumnItemClick,
        handleLeftArrowClick, 
        handleRightArrowClick,
        resetAllData,
    } = useTiled(url);
    
    const handleSelectClick = (item:TiledSearchItem<TiledStructures>) => {
        const links = generateLinksForCallback(item, url); //wont work due to stale state of url
        onSelectCallback && onSelectCallback(links);
        closeOnSelect && setIsClosed(true);
    }; */

    const handleStartupScreenSubmit = () => {
        setShowStartupScreen(false);
    }

    if (!isClosed) {
        return (
            <div className={`w-screen border  h-screen flex justify-center items-center ${isPopup ? 'relative top-0 left-0 z-50' : ''}`} {...props}>
                <div className="flex flex-col min-w-[800px] max-w-[1000px] w-1/2 max-h-[2000px] min-h-[700px] h-1/2 border border-slate-400 shadow-lg rounded-md ">
                    {
                        (enableStartupScreen && showStartupScreen) ?
                            <StartupScreen url={url} handleUrlChange={setUrl} handleSubmit={handleStartupScreenSubmit}/>
                        :
                        <TiledContainer setIsClosed={setIsClosed} url={url} closeOnSelect={closeOnSelect} onSelectCallback={onSelectCallback}/>
/*                         <>
                            <TiledHeader breadcrumbs={breadcrumbs} onLeftArrowClick={handleLeftArrowClick} onRightArrowClick={handleRightArrowClick} onHomeClick={resetAllData} secondaryTitle={url}/>
                            <TiledBody>
                                <TiledColumns columns={columns} breadcrumbs={breadcrumbs} onItemClick={handleColumnItemClick} handleSelectClick={handleSelectClick}/>
                                {previewItem && <TiledPreview previewItem={previewItem} previewSize={previewSize} handleSelectClick={handleSelectClick} url={url}/>}
                            </TiledBody>
                            <TiledFooter breadcrumbs={breadcrumbs}/>
                        </> */
                    }
                </div>
            </div>
        ) 
    }
}
