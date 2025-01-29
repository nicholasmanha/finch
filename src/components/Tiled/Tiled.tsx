//import { useEffect, useRef } from "react";
import TiledHeader from "./TiledHeader";
import TiledColumns from "./TiledColumns";
import TiledPreview from "./TiledPreview";
import TiledFooter from "./TiledFooter";
import TiledBody from "./TiledBody";
import './Tiled.css'


import { useTiled } from './useTiled';

type TiledProps = {

}
export default function Tiled({
    ...props
}: TiledProps) {

    console.log('Render Tiled.tsx')
    const { 
        columns, 
        breadcrumbs,
        imageUrl,
        popoutUrl,
        previewSize,
        handleColumnItemClick,
        handleLeftArrowClick, 
    } = useTiled(); 


    return (
        <div className="w-screen border h-screen flex justify-center items-center" {...props}>
            <div className="flex flex-col min-w-[400px] max-w-[1000px] w-1/2 max-h-[2000px] min-h-[700px] h-1/2 border ">
                <TiledHeader breadcrumbs={breadcrumbs} onLeftArrowClick={handleLeftArrowClick}/>
                <TiledBody>
                    <TiledColumns columns={columns} breadcrumbs={breadcrumbs} onItemClick={handleColumnItemClick}/>
                    <TiledPreview imageUrl={imageUrl} popoutUrl={popoutUrl} previewSize={previewSize}/>
                </TiledBody>
                <TiledFooter breadcrumbs={breadcrumbs}/>
            </div>
        </div>
    )
}
