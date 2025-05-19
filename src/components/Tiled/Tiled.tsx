import { useState } from "react";
import TiledContainer from "./TiledContainer";
import StartupScreen from "./StartupScreen";
import './Tiled.css'

import { cn } from "@/lib/utils";

export type TiledProps = {
    onSelectCallback?: Function,
    size?: 'small' | 'medium' | 'large'
    closeOnSelect?: boolean,
    isPopup?: boolean,
    enableStartupScreen?: boolean,
    tiledBaseUrl?: string,
    backgroundClassName?: string,
    singleColumnMode?: boolean,
    contentClassName?: string,
    isFullWidth?: boolean,
}
export default function Tiled({
    onSelectCallback,
    size,
    closeOnSelect=false,
    isPopup,
    enableStartupScreen=false,
    tiledBaseUrl,
    backgroundClassName,
    contentClassName,
    singleColumnMode=false,
    isFullWidth=false,
    ...props
}: TiledProps) {
    const [ isClosed, setIsClosed ] = useState<boolean>(false);
    const [ showStartupScreen, setShowStartupScreen ] = useState<boolean>(true);
    const [ url, setUrl ] = useState<undefined | string>(tiledBaseUrl);
    const [ isExpanded, setIsExpanded ] = useState<boolean>(false);

    const sizeClassMap = {
        small: 'min-w-[600px] min-h-[500px]',
        medium: 'min-w-[800px] min-h-[800px]',
        large: 'min-w-[1200px] min-h-[1200px]',
    };

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    }

    const handleStartupScreenSubmit = () => {
        setShowStartupScreen(false);
    }


    if (!isClosed) {
        return (
            <div className={cn(`flex w-full h-full justify-center items-center ${size && sizeClassMap[size]} ${isPopup ? 'relative top-0 left-0 z-50 w-screen h-screen' : ''}`, backgroundClassName)} {...props}>
                <div className={cn(`flex flex-col border border-slate-400 shadow-lg rounded-md bg-white ${size ? `${sizeClassMap[size]} w-1/2 h-1/2` : `${sizeClassMap['small']} w-full h-full`} ${isFullWidth && 'w-full'}  ${isExpanded && 'h-full w-full'}`, contentClassName)}>
                    {
                        (enableStartupScreen && showStartupScreen) ?
                            <StartupScreen 
                                url={url} 
                                handleUrlChange={setUrl} 
                                handleSubmit={handleStartupScreenSubmit}
                            />
                        :
                        <TiledContainer 
                            setIsClosed={setIsClosed} 
                            url={url} 
                            closeOnSelect={closeOnSelect} 
                            onSelectCallback={onSelectCallback} 
                            singleColumnMode={singleColumnMode}
                            handleExpandClick={handleExpandClick}
                            isExpanded={isExpanded}
                        />
                    }
                </div>
            </div>
        ) 
    }
}
