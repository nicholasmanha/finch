import axios from "axios";
import { sampleTiledSearchData } from "./sampleData.ts";

// when you start tiled, need to pass in CORS
//TILED_ALLOW_ORIGINS=http://localhost:5174 tiled serve demo

const getTiledUrl = () => {
    //return the url from any available env variables
    return 'http://127.0.0.1:8000/api/v1';
};

const getTiledApiKey = () => {
    //return the tiled api key from env variables
    return '';
}

const tiledUrl = getTiledUrl();
const tiledApiKey = getTiledApiKey();

const getSearchResults = async (searchPath?:string, cb:Function =()=>{}, mock:boolean = false) => {
    if (mock) {
        cb(sampleTiledSearchData.data);
        return;
    }
    try {
        const response = await axios.get(tiledUrl + '/search/' + searchPath);
        cb(response.data);
    } catch (error) {
        console.error('Error searching path: ', error);
    }
};

const sampleImgUrl = 'http://127.0.0.1:8000/api/v1/array/full/small_image?format=image/png&slice=';
const sample3dCubeUrlat50thStack = 'http://127.0.0.1:8000/api/v1/array/full/tiny_cube?format=image/png&slice=49,::1,::1'

const sampleSearchData = [
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


const sampleColumnData = [
    sampleTiledSearchData.data,
    sampleTiledSearchData.data,
    sampleTiledSearchData.data
];


export { getSearchResults, getTiledUrl }