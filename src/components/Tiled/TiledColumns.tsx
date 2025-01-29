//import { sampleTiledSearchData } from './sampleData';
import { useRef, useEffect } from 'react';
import './Tiled.css'
import { sampleTiledSearchData } from "./sampleData.ts";
import {TiledSearchResult, TiledSearchItem, Breadcrumb, TiledStructures } from './types';

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
    console.log('render TiledColumns.tsx')
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const sampleData = [
        {
            "id": "big_image",
            "attributes": {
                "ancestors": [],
                "structure_family": "array",
                "specs": [],
                "metadata": {},
                "structure": {
                    "data_type": {
                        "endianness": "little",
                        "kind": "f",
                        "itemsize": 8,
                        "dt_units": null
                    },
                    "chunks": [
                        [
                            4096,
                            4096,
                            1808
                        ],
                        [
                            4096,
                            4096,
                            1808
                        ]
                    ],
                    "shape": [
                        10000,
                        10000
                    ],
                    "dims": null,
                    "resizable": false
                },
                "sorting": null,
                "data_sources": null
            },
            "links": {
                "self": "http://127.0.0.1:8000/api/v1/metadata/big_image",
                "full": "http://127.0.0.1:8000/api/v1/array/full/big_image",
                "block": "http://127.0.0.1:8000/api/v1/array/block/big_image?block={0},{1}"
            },
            "meta": null
        },
        {
            "id": "small_image",
            "attributes": {
                "ancestors": [],
                "structure_family": "array",
                "specs": [],
                "metadata": {},
                "structure": {
                    "data_type": {
                        "endianness": "little",
                        "kind": "f",
                        "itemsize": 8,
                        "dt_units": null
                    },
                    "chunks": [
                        [
                            300
                        ],
                        [
                            300
                        ]
                    ],
                    "shape": [
                        300,
                        300
                    ],
                    "dims": null,
                    "resizable": false
                },
                "sorting": null,
                "data_sources": null
            },
            "links": {
                "self": "http://127.0.0.1:8000/api/v1/metadata/small_image",
                "full": "http://127.0.0.1:8000/api/v1/array/full/small_image",
                "block": "http://127.0.0.1:8000/api/v1/array/block/small_image?block={0},{1}"
            },
            "meta": null
        },
        {
            "id": "medium_image",
            "attributes": {
                "ancestors": [],
                "structure_family": "array",
                "specs": [],
                "metadata": {},
                "structure": {
                    "data_type": {
                        "endianness": "little",
                        "kind": "f",
                        "itemsize": 8,
                        "dt_units": null
                    },
                    "chunks": [
                        [
                            1000
                        ],
                        [
                            1000
                        ]
                    ],
                    "shape": [
                        1000,
                        1000
                    ],
                    "dims": null,
                    "resizable": false
                },
                "sorting": null,
                "data_sources": null
            },
            "links": {
                "self": "http://127.0.0.1:8000/api/v1/metadata/medium_image",
                "full": "http://127.0.0.1:8000/api/v1/array/full/medium_image",
                "block": "http://127.0.0.1:8000/api/v1/array/block/medium_image?block={0},{1}"
            },
            "meta": null
        },
        {
            "id": "sparse_image",
            "attributes": {
                "ancestors": [],
                "structure_family": "sparse",
                "specs": [],
                "metadata": {},
                "structure": {
                    "shape": [
                        100,
                        100
                    ],
                    "chunks": [
                        [
                            100
                        ],
                        [
                            100
                        ]
                    ],
                    "dims": null,
                    "resizable": false,
                    "layout": "COO"
                },
                "sorting": null,
                "data_sources": null
            },
            "links": {
                "self": "http://127.0.0.1:8000/api/v1/metadata/sparse_image",
                "full": "http://127.0.0.1:8000/api/v1/array/full/sparse_image",
                "block": "http://127.0.0.1:8000/api/v1/array/block/sparse_image?block={0},{1}"
            },
            "meta": null
        },
    ];

    const paths:string[] = [
        'structured_data',
        'big_image'
    ];

    const folder = <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 256 256"><path fill="currentColor" d="M216,72H131.31L104,44.69A15.86,15.86,0,0,0,92.69,40H40A16,16,0,0,0,24,56V200.62A15.4,15.4,0,0,0,39.38,216H216.89A15.13,15.13,0,0,0,232,200.89V88A16,16,0,0,0,216,72ZM40,56H92.69l16,16H40ZM216,200H40V88H216Z"></path></svg>;
    const brackestSqaure = <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 256 256"><path fill="currentColor" d="M48,48V208H80a8,8,0,0,1,0,16H40a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8H80a8,8,0,0,1,0,16ZM216,32H176a8,8,0,0,0,0,16h32V208H176a8,8,0,0,0,0,16h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32Z"></path></svg>;
    const table = <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 256 256"><path fill="currentColor" d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM40,112H80v32H40Zm56,0H216v32H96ZM216,64V96H40V64ZM40,160H80v32H40Zm176,32H96V160H216v32Z"></path></svg>;
    const question = <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 256 256"><path fill="currentColor" d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>;
   
    const renderIcon = (structureFamily:string) => {
        var icon = question;
        var lineColor = '';
        if (structureFamily === 'array' || structureFamily === 'awkward' || structureFamily === 'sparse') {
            icon = brackestSqaure;
        }
        if (structureFamily === 'table') {
            icon = table;
        }
        if (structureFamily === 'container') {
            icon = folder;
            lineColor = 'text-sky-700';
        }

        return (
            <div className={`w-6 aspect-square ${lineColor}`}>{icon}</div>
        )
    };

    const columnData = [
        sampleTiledSearchData.data,
        sampleTiledSearchData.data,
        sampleTiledSearchData.data
    ];

    type ColumnProps = {
        data: TiledSearchItem<TiledStructures>[],
        index: number,
    };



    const Column = ({data, index}: ColumnProps) => {
        console.log({data})
        return (
            <div className="border-r border-r-slate-400 min-w-[250px] w-fit px-4 h-full scrollbar-always-visible overflow-y-auto">
                <ul>
                    {data.map((item:any) => {
                        return (
                            <li 
                                className={`${ (breadcrumbs.length > index) && breadcrumbs[index].label === item.id ? 'bg-sky-200 hover:bg-sky-300' : 'hover:bg-sky-300'} flex space-x-2 px-2 rounded-sm hover:cursor-pointer relative`} 
                                key={item.id+index}
                                onClick={()=>onItemClick(item)}
                            >
                                {renderIcon(item.attributes.structure_family)}
                                <p>{item.id}</p>
                                {item.attributes.structure_family === 'container' ? <p className="absolute right-1 text-slate-500">&gt;</p> : ''}
                            </li>
                        )
                    })}
                </ul>            
            </div>
        )
    }

 /*    useEffect(() => {
        //when columns load scroll to the right
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        } 
    }, [columns]);
    */
    return (
        <div className="flex h-full" {...props}>
            {columns.map((column, index) => <Column data={column.data} key={index} index={index}/>)}
        </div>
    )
}

/* return (
    <div className="flex-grow min-w-96 h-full" {...props}>
        <div className="flex w-full h-full overflow-x-auto scrollbar-always-visible " ref={scrollContainerRef}>
            {columns.map((column, index) => <Column data={column.data} key={index} index={index}/>)}
        </div>
    </div>
) */