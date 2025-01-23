import axios from "axios";
import { sampleTiledSearchData } from "./sampleData";

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

export { getSearchResults }