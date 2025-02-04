//import { sampleTiledSearchData } from './sampleData';
import './Tiled.css'
import {TiledSearchResult, Breadcrumb } from './types';
import { TiledColumn } from './TiledColumn.tsx';

type TiledColumnsProps = {
    columns:TiledSearchResult[];
    onItemClick: Function;
    breadcrumbs: Breadcrumb[];
}
export default function TiledColumns({
    columns,
    onItemClick=()=>{},
    breadcrumbs,
    ...props
}: TiledColumnsProps) {


    //TODO - we can propbably just remove TiledColumns entirely and hoist this map call up into the previous component
    return (
        <div className="flex h-full" {...props}>
            {columns.map((column, index) => <TiledColumn data={column.data} key={index} index={index} onItemClick={onItemClick} breadcrumbs={breadcrumbs}/>)}
        </div>
    )
}
