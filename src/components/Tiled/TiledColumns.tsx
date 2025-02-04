//import { sampleTiledSearchData } from './sampleData';
import { useRef, useEffect } from 'react';
import './Tiled.css'
import { sampleTiledSearchData } from "./sampleData.ts";
import {TiledSearchResult, TiledSearchItem, Breadcrumb, TiledStructures } from './types';
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


    const columnData = [
        sampleTiledSearchData.data,
        sampleTiledSearchData.data,
        sampleTiledSearchData.data
    ];




    return (
        <div className="flex h-full" {...props}>
            {columns.map((column, index) => <TiledColumn data={column.data} key={index} index={index} onItemClick={onItemClick} breadcrumbs={breadcrumbs}/>)}
        </div>
    )
}
