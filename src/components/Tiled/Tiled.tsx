//import { useEffect, useRef } from "react";
import TiledHeader from "./TiledHeader";
import TiledColumns from "./TiledColumns";
import TiledPreview from "./TiledPreview";
import TiledFooter from "./TiledFooter";
import TiledBody from "./TiledBody";
import './Tiled.css'

import { TiledSearchItem, TiledStructures } from "./types";
import { generateLinksForCallback } from "./utils";


import { useTiled } from './useTiled';

type TiledProps = {
    onSelectCallback?: Function,
}
export default function Tiled({
    onSelectCallback,
    ...props
}: TiledProps) {

    const { 
        columns, 
        breadcrumbs,
        previewItem,
        previewSize,
        handleColumnItemClick,
        handleLeftArrowClick, 
        handleRightArrowClick,
        resetAllData,
    } = useTiled();
    
    const handleSelectClick = (item:TiledSearchItem<TiledStructures>) => {
        const links = generateLinksForCallback(item);
        onSelectCallback && onSelectCallback(links);
    }


    return (
        <div className="w-screen border  h-screen flex justify-center items-center" {...props}>
            <div className="flex flex-col min-w-[800px] max-w-[1000px] w-1/2 max-h-[2000px] min-h-[700px] h-1/2 border border-slate-400 shadow-lg rounded-md ">
                <TiledHeader breadcrumbs={breadcrumbs} onLeftArrowClick={handleLeftArrowClick} onRightArrowClick={handleRightArrowClick} onHomeClick={resetAllData}/>
                <TiledBody>
                    <TiledColumns columns={columns} breadcrumbs={breadcrumbs} onItemClick={handleColumnItemClick} handleSelectClick={handleSelectClick}/>
                    {previewItem && <TiledPreview previewItem={previewItem} previewSize={previewSize} handleSelectClick={handleSelectClick}/>}
                </TiledBody>
                <TiledFooter breadcrumbs={breadcrumbs}/>
            </div>
        </div>
    )
}
