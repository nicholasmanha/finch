import Button from '../Button.tsx';
import PreviewNDArray from './PreviewNDArray.tsx';
import PreviewTable from './PreviewTable.tsx';
import { PreviewSize, TiledSearchItem, ArrayStructure, TableStructure, isArrayStructure, isTableStructure } from './types.ts';
import TiledPreviewMetadata from './TiledPreviewMetadata.tsx';

const arrowsPointingOut = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
</svg>;
const arrowDownTray = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
<path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
</svg>;
const arrowTopRight = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
</svg>;

type TiledPreviewProps = {
    previewItem: TiledSearchItem<ArrayStructure> | TiledSearchItem<TableStructure>
    previewSize: PreviewSize;
    onSelect?:Function;
}
export default function TiledPreview({
    previewItem,
    onSelect=()=>{},
    previewSize='medium',
    ...props
}: TiledPreviewProps) {
    const previewSizeMap = {
        'hidden': 'hidden',
        'small': 'min-w-72',
        'medium': 'min-w-96',
        'large': 'min-w-[30rem]'
    }
    // Type guard for ArrayStructure

    return (
        <div className={`${previewSizeMap[previewSize]} flex-grow h-full flex flex-col overflow-y-auto relative`} {...props}>
            <div className="flex justify-between px-2 pt-2 absolute top-0 w-full">
                <div className="h-6 aspect-square hover:cursor-pointer hover:text-slate-600">{arrowsPointingOut}</div>
                <div className="h-6 aspect-square hover:cursor-pointer hover:text-slate-600">{arrowDownTray}</div>
            </div>
            <div className="w-full flex flex-col items-center space-y-8 py-4">
                {isArrayStructure(previewItem) && <PreviewNDArray arrayItem={previewItem}/>}
                {isTableStructure(previewItem) && <PreviewTable tableItem={previewItem}/>}
                <Button text="Select" size="medium" cb={onSelect} />
            </div>
            <TiledPreviewMetadata item={previewItem}/>
        </div>
    )
}

