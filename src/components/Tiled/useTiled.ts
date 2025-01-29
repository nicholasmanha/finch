import { useEffect, useState, useRef, useMemo, useCallback } from "react";

import { getSearchResults, getFullImagePng } from "./apiClient";
import { 
    TiledSearchResult, 
    TiledSearchItem, 
    Breadcrumb, 
    ArrayStructure, 
    ContainerStructure, 
    TableStructure, 
    TiledStructures,
    PreviewSize, 
 } from "./types";
import { getTiledStructureIcon } from "./utils";

export const useTiled = () => {
    console.log('run useTiled.ts')

    const [ columns, setColumns ] = useState<TiledSearchResult[]>([]);
    //const [ previewVisibility, setPreviewVisibility ] = useState<boolean>(false);
    //const [ ancestors, setAncestors ] = useState<string[]>(['']);
    const [ breadcrumbs, setBreadcrumbs ] = useState<Breadcrumb[]>([]);
    const [ imageUrl, setImageUrl ] = useState<string | undefined>();
    const [ popoutUrl, setPopoutUrl ] = useState<string | undefined>();
    const [ previewSize, setPreviewSize ] = useState<PreviewSize>('hidden');
    const [ goBack, setGoBack ] = useState<Function | undefined>(undefined);
    const [ goForward, setGoForward ] = useState<Function | undefined>(undefined);
    const [ handleArrowClick, setHandleArrowClick ] = useState<Function | undefined>(undefined);

    const onArrowClick = () => {
        //this function will manage the forward/backward clicks for a set of callbacks that traverse the columns
        //the data structure should be a stack where we track the index
        //If a user clicks a previous column via the item in the column, or clicks the footer, the onArrowClick will pop off 
        //any dangling containers.

        //Only if the user clicks the back arrow will the forward options continue to work (which will also adjust the index pointer)
    }

    const defaultPreviewSize = 'medium';

    const updateColumns = useCallback((clickedItem:TiledSearchItem<TiledStructures>, newColumn?:TiledSearchResult ) => {
        setColumns((prevState) => {
            const newState = prevState.slice(0, clickedItem.attributes.ancestors.length + 1);
    
            if (newColumn) {
                return [...newState, newColumn];
            }
    
            return newState;
        });
    }, []);




    const updateBreadcrumbs = useCallback((clickedItem:TiledSearchItem<TiledStructures>) => {
        //function assumes users may only click on items that exist in the current search 'stack' and cannot jump to a different branch
        setBreadcrumbs((prevState) => {
            var stateCopy = [...prevState]; //must use shallow to copy to hold function references
            const ancestors:string[] = clickedItem.attributes.ancestors;
            while (stateCopy.length  > ancestors.length) {
                stateCopy.pop();
            }
            var newBreadcrumb:Breadcrumb = {
                label: clickedItem.id,
                icon: getTiledStructureIcon(clickedItem.attributes.structure_family),
                onClick: ()=>handleColumnItemClick(clickedItem)
            }
            stateCopy.push(newBreadcrumb);
            return stateCopy;
        })
    }, []);

    const handlePreviewUpdate = (item:any, format:'array' | 'table') => {
        //renders either an array component or table component

        //set the preview component display to visible
    };

    const closePreview = () => {
        //remove the preview component from 
        setImageUrl(undefined);
        setPopoutUrl(undefined);
        setPreviewSize('hidden');
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

    const handleColumnItemClick = useCallback((item:TiledSearchItem<TiledStructures>) => {
        if (isArrayStructure(item)) {
            handleArrayClick(item); 
          } else if (isTableStructure(item)) {
            handleTableClick(item); 
          } else if (isContainerStructure(item)) {
            handleContainerClick(item); 
          } else {
            console.error('Error: No matching structure family found for: ' + item.attributes.structure_family);
          }
    }, []);

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

    const handleArrayClick = useCallback((item:TiledSearchItem<ArrayStructure>) => {
        //get path of array and set as image URL
        //we need to downsample certain images based on size
        const arrayLength = item.attributes.structure.shape.length;
        if (arrayLength != 2) {
            console.error('Current UI only supports displaying 2D arrays');
            return;
        }
        var step = 1; //the step to call for both X and Y axis when retrieving array data, 1 is all, 2 is every other, etc..
        if (item.attributes.structure.data_type && item.attributes.structure.data_type.kind) {
          const letter = item.attributes.structure.data_type.kind[0] as keyof typeof numpyTypeSizesBytes;
          const bytesPerElement = numpyTypeSizesBytes[letter];
      
          if (bytesPerElement) {
            //console.log(`Bytes per element: ${bytesPerElement}`);
            const totalImageSizeBytes = item.attributes.structure.shape[0] * item.attributes.structure.shape[1] * bytesPerElement;
            const maxBytesAllowed = 1000000;
            if (totalImageSizeBytes > maxBytesAllowed) {
                const ratio = totalImageSizeBytes / maxBytesAllowed;
                step = Math.ceil(Math.sqrt(ratio)); //make a step in both X and Y, so step should be square root of the ratio
            }
            const searchPath = createSearchPath(item);
            const reducedImagePath = getFullImagePng(searchPath, step);
            setImageUrl(reducedImagePath); //renders in the preview
            const fullSizeImagePath = getFullImagePng(searchPath, 1);
            setPopoutUrl(fullSizeImagePath); //attaches to a click handler for when users want to see full image in new tab
            updateBreadcrumbs(item);
            setPreviewSize(defaultPreviewSize);
            updateColumns(item);
          } else {
            console.error(`Unknown data type kind: ${letter}`);
          }
        }
    }, []);

    const handleTableClick = (item:any) => {
        //search table, put results into table preview and render preview
    };

    const handleContainerClick = (item:TiledSearchItem<ContainerStructure>) => {
        //search container, put results into column, disable preview
        const searchPath = createSearchPath(item);
        getSearchResults(searchPath, (res:TiledSearchResult) => handleSearchResponse(item, res));
        closePreview();
    };

    const handleSearchResponse = useCallback((clickedItem:TiledSearchItem<TiledStructures>, res:TiledSearchResult) => {
        updateColumns(clickedItem, res);
        updateBreadcrumbs(clickedItem);
    }, []);


    const handleSearchResults = (res:TiledSearchResult) => {

    }

    const logResponse = (response:any) => {
        console.log({response});
    };

    useEffect(() => {
        //get first set of results from root
        getSearchResults('', (res:TiledSearchResult) => setColumns([res]));
    }, []);

    return useMemo(() => ({
        columns,
        breadcrumbs,
        imageUrl,
        popoutUrl,
        previewSize,
        handleColumnItemClick,
    }), [columns, breadcrumbs, imageUrl, popoutUrl, previewSize, handleColumnItemClick])

}