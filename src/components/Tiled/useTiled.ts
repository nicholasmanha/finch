import { useEffect, useState, useRef } from "react";

import { getSearchResults, getFullImagePng } from "./apiClient";
import { TiledSearchResult, TiledSearchItem, Breadcrumb, ArrayStructure, ContainerStructure, TableStructure, TiledStructures } from "./types";
import { tiledStructureIcons } from "./icons";

export const useTiled = () => {

    const [ columns, setColumns ] = useState<TiledSearchResult[]>([]);
    const [ previewVisibility, setPreviewVisibility ] = useState<boolean>(false);
    const [ ancestors, setAncestors ] = useState<string[]>(['']);
    const [ breadcrumbs, setBreadcrumbs ] = useState<Breadcrumb[]>([]);
    const [ imageUrl, setImageUrl ] = useState<string>('');

    const updateColumns = (clickedItem:TiledSearchItem<TiledStructures>, newColumn?:TiledSearchResult ) => {
        setColumns((prevState) => {
            var stateCopy = JSON.parse(JSON.stringify(prevState));
            while (stateCopy.length - 1 > clickedItem.attributes.ancestors.length) {
                console.log('pop')
                stateCopy.pop();
            }
            //Only container items will add a new column
            if (newColumn) {
                if (stateCopy.length === 0) {
                    return [newColumn];
                } else {
                    stateCopy.push(newColumn);
                }
            }
            return stateCopy;
        });
    };

/*     const handleAncestorUpdate = (searchResult:TiledSearchResult, ancestors:string[]) => {
        //is search empty?
        //TODO - check if there is a condition where data can return an empty object, which has array length > 0
        if (searchResult.data.length === 0) {
            setAncestors(['']);
        } else {
            var firstItem = searchResult.data[0];
            setAncestors(firstItem.attributes.ancestors);
        }
    }; */


    const getTiledStructureIcon = (structureFamily:string) => {
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

    const updateBreadcrumbs = (clickedItem:TiledSearchItem<TiledStructures>) => {
        //function assumes users may only click on items that exist in the current search 'stack'
        setBreadcrumbs((prevState) => {
            var stateCopy = JSON.parse(JSON.stringify(prevState));
            const ancestors:string[] = clickedItem.attributes.ancestors;
            while (stateCopy.length  > ancestors.length) {
                stateCopy.pop();
            }
            var newBreadcrumb:Breadcrumb = {
                label: clickedItem.id,
                icon: getTiledStructureIcon(clickedItem.attributes.structure_family)
            }
            stateCopy.push(newBreadcrumb);
            return stateCopy;
        })
    }

    const handlePreviewUpdate = (item:any, format:'array' | 'table') => {
        //renders either an array component or table component

        //set the preview component display to visible
    };

    const closePreview = () => {
        //remove the preview component from display
    }

        // Type guard for ArrayStructure
    const isArrayStructure = (item: TiledSearchItem<any>): item is TiledSearchItem<ArrayStructure> => {
        return item.attributes.structure_family === 'array';
    };
    
    // Type guard for TableStructure
    const isTableStructure = (item: TiledSearchItem<any>): item is TiledSearchItem<TableStructure> => {
        return item.attributes.structure_family === 'table';
    };
    
    // Type guard for ContainerStructure
    const isContainerStructure = (item: TiledSearchItem<any>): item is TiledSearchItem<ContainerStructure> => {
        return item.attributes.structure_family === 'container';
    };

    const handleColumnItemClick = (item:TiledSearchItem<ArrayStructure | ContainerStructure>) => {
        if (isArrayStructure(item)) {
            handleArrayClick(item); 
          } else if (isTableStructure(item)) {
            handleTableClick(item); 
          } else if (isContainerStructure(item)) {
            handleContainerClick(item); 
          } else {
            console.error('Error: No matching structure family found for: ' + item.attributes.structure_family);
          }
    };

    const createSearchPath = (item: TiledSearchItem<TiledStructures>):string => {
        const ancestors = item.attributes.ancestors;
        var searchPath:string = ancestors.length > 0 ? item.attributes.ancestors.join('/') + '/' : '';
        searchPath+=item.id;
        return searchPath;
    };

    const numpyTypeSizesBytes: Record<string, number> = {
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

    const handleArrayClick = (item:TiledSearchItem<ArrayStructure>) => {
        //get path of array and set as image URL
        //we need to downsample certain images based on size
        const arrayLength = item.attributes.structure.shape.length;
        if (arrayLength != 2) {
            console.error('Current UI only supports displaying 2D arrays');
            return;
        }

        var step = 1;

        if (item.attributes.structure.data_type && item.attributes.structure.data_type.kind) {
          const letter = item.attributes.structure.data_type.kind[0] as keyof typeof numpyTypeSizesBytes;
          const bytesPerElement = numpyTypeSizesBytes[letter];
      
          if (bytesPerElement) {
            console.log(`Bytes per element: ${bytesPerElement}`);
            const totalImageSizeBytes = item.attributes.structure.shape[0] * item.attributes.structure.shape[1] * bytesPerElement;
            const maxBytesAllowed = 1000000
            if (totalImageSizeBytes > maxBytesAllowed) {
                const ratio = totalImageSizeBytes / maxBytesAllowed;
                step = Math.ceil(Math.sqrt(ratio)); //make a step in both X and Y, so step should be square root of the ratio
            }
    
            const searchPath = createSearchPath(item);
            const imagePath = getFullImagePng(searchPath, step);
            console.log({imagePath});
            setImageUrl(imagePath);
            console
          } else {
            console.error(`Unknown data type kind: ${letter}`);
          }
        }
    };

    const handleTableClick = (item:any) => {
        //search table, put results into table preview and render preview
    };

    const handleContainerClick = (item:TiledSearchItem<ContainerStructure>) => {
        //search container, put results into column, disable preview
        //console.log('handle container click');
        //const ancestors = item.attributes.ancestors;
        //var searchPath:string = ancestors.length > 0 ? item.attributes.ancestors.join('/') + '/' : '';
        //searchPath+=item.id;
        const searchPath = createSearchPath(item);
        getSearchResults(searchPath, (res:TiledSearchResult) => handleSearchResponse(item, res));
        //getSearchResults(searchPath, (res:TiledSearchResult) => logResponse(res));

    };

    const handleSearchResponse = (clickedItem:TiledSearchItem<TiledStructures>, res:TiledSearchResult) => {
        updateColumns(clickedItem, res);
        updateBreadcrumbs(clickedItem);
    };


    const handleSearchResults = (res:TiledSearchResult) => {

    }

    const logResponse = (response:any) => {
        console.log({response});
    };

    useEffect(() => {
        //make the first api call to search Tiled at the root
        getSearchResults('', (res:TiledSearchResult) => setColumns([res]));
    }, []);

    return {
        columns,
        previewVisibility,
        ancestors,
        handleColumnItemClick,
        breadcrumbs,
        updateColumns,
        imageUrl
    };

}