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

    const { 
        columns, 
        previewVisibility, 
        breadcrumbs,
        imageUrl,
        popoutUrl,
        previewSize,
        handleColumnItemClick 
    } = useTiled(); 
/* 
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        //when columns load scroll to the right
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        } 
    }, [columns, imageUrl ]); */

    return (
        <div className="w-screen border h-screen flex justify-center items-center" {...props}>
            <div className="flex flex-col min-w-[400px] max-w-[1000px] w-1/2 max-h-[2000px] min-h-[700px] h-1/2 border ">
                <TiledHeader breadcrumbs={breadcrumbs} />
                <TiledBody>
                    <TiledColumns columns={columns} breadcrumbs={breadcrumbs} onItemClick={handleColumnItemClick}/>
                    <TiledPreview imageUrl={imageUrl} popoutUrl={popoutUrl} previewSize={previewSize}/>
                </TiledBody>
                <TiledFooter breadcrumbs={breadcrumbs}/>
            </div>
        </div>
    )
}
/* 
<div className="w-full flex min-h-0 flex-grow border overflow-x-auto scrollbar-always-visible " ref={scrollContainerRef}>
<TiledColumns columns={columns} breadcrumbs={breadcrumbs} onItemClick={handleColumnItemClick}/>
<TiledPreview imageUrl={imageUrl} popoutUrl={popoutUrl} previewSize={previewSize}/>
</div> */