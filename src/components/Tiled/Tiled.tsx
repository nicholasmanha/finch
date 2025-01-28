import TiledHeader from "./TiledHeader";
import TiledColumns from "./TiledColumns";
import TiledPreview from "./TiledPreview";
import TiledFooter from "./TiledFooter";

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


    return (
        <div className="w-screen border h-screen flex justify-center items-center" {...props}>
            <div className="flex flex-col min-w-[800px] max-w-[1000px] w-1/2 max-h-[2000px] min-h-[700px] h-1/2 border ">
                <TiledHeader breadcrumbs={breadcrumbs} />
                <div className="w-full flex min-h-0 flex-grow border ">
                    <TiledColumns columns={columns} breadcrumbs={breadcrumbs} onItemClick={handleColumnItemClick}/>
                    <TiledPreview imageUrl={imageUrl} popoutUrl={popoutUrl} previewSize={previewSize}/>
                </div>
                <TiledFooter breadcrumbs={breadcrumbs}/>
            </div>
        </div>
    )
}