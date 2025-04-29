import TiledHeader from "./TiledHeader";
import TiledColumns from "./TiledColumns";
import TiledPreview from "./TiledPreview";
import TiledFooter from "./TiledFooter";
import TiledBody from "./TiledBody";
import './Tiled.css'


import { TiledSearchItem, TiledStructures } from "./types";
import { generateLinksForCallback } from "./utils";

import { useTiled } from './useTiled';

type TiledContainerProps = {
    url: string | undefined,
    onSelectCallback?: Function,
    closeOnSelect?: boolean,
    setIsClosed: Function
}
export default function TiledContainer({
    url,
    onSelectCallback,
    closeOnSelect,
    setIsClosed,
    ...props
}: TiledContainerProps) {

    const { 
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
        const links = generateLinksForCallback(item, url);
        onSelectCallback && onSelectCallback(links);
        closeOnSelect && setIsClosed(true);
    };

    return (
        <>
            <TiledHeader breadcrumbs={breadcrumbs} onLeftArrowClick={handleLeftArrowClick} onRightArrowClick={handleRightArrowClick} onHomeClick={resetAllData} secondaryTitle={url}/>
            <TiledBody>
                <TiledColumns columns={columns} breadcrumbs={breadcrumbs} onItemClick={handleColumnItemClick} handleSelectClick={handleSelectClick}/>
                {previewItem && <TiledPreview previewItem={previewItem} previewSize={previewSize} handleSelectClick={handleSelectClick} url={url}/>}
            </TiledBody>
            <TiledFooter breadcrumbs={breadcrumbs}/>
        </>
    )
}
