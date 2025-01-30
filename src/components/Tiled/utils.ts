import { tiledStructureIcons } from "./icons";
import { TiledSearchItem, TiledStructures } from "./types";
import { getTiledUrl } from "./apiClient";

export const getTiledStructureIcon = (structureFamily:string) => {
    var icon = tiledStructureIcons.question;
    if (structureFamily === 'array' || structureFamily === 'awkward' || structureFamily === 'sparse') {
        icon = tiledStructureIcons.brackestSqaure;
    }
    if (structureFamily === 'table') {
        icon = tiledStructureIcons.table;
    }
    if (structureFamily === 'container') {
        icon = tiledStructureIcons.folder;
    }

    return icon;
};

export const generateSearchPath = (item: TiledSearchItem<TiledStructures>, extra?:string):string => {
    const ancestors = item.attributes.ancestors;
    var searchPath:string = ancestors.length > 0 ? item.attributes.ancestors.join('/') + '/' : '';
    searchPath+=item.id;
    if (extra) {
        searchPath+=extra;
    }
    return searchPath;
};

const tiledUrl = getTiledUrl();

export const generateFullImagePngPath = (searchPath?:string, stepY?:number, stepX?:number, stack?:number[]) => {
    const stackString = stack ? stack.join(',') : '';
    return (tiledUrl + '/array/full/' + searchPath + '?format=image/png&slice=' + stackString + ',::' + stepY + ',::' + stepX);
};

export const numpyTypeSizesBytes: Record<string, number> = {
    // Numerical Data Types
    b: 1,  // int8
    B: 1,  // uint8
    h: 2,  // int16
    H: 2,  // uint16
    i: 4,  // int32
    I: 4,  // uint32
    l: 8,  // int64
    L: 8,  // uint64
    q: 8,  // int64
    Q: 8,  // uint64
    f: 4,  // float32
    d: 8,  // float64
    g: 16, // float128 (platform-dependent)
  
    // Complex Number Data Types
    F: 8,  // complex64 (2 * float32)
    D: 16, // complex128 (2 * float64)
    G: 32, // complex256 (2 * float128, platform-dependent)
  
    // Character and String Data Types
    S: 1,  // string_ (1 byte per character, fixed length)
    a: 1,  // alias for 'S'
    U: 4,  // unicode_ (4 bytes per character, fixed length)
  
    // Boolean Data Type
    '?': 1, // bool_ (True or False)
  
    // Other Data Types
    O: 8,  // object_ (platform-dependent, typically pointer size)
    M: 8,  // datetime64
    m: 8,  // timedelta64
    V: 1   // void (raw data, size depends on context)
  };