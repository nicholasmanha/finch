import { useEffect, useState, useRef, useMemo, useCallback } from "react";

import { getSearchResults } from "./apiClient";
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
import { getTiledStructureIcon, generateFullImagePngPath, generateSearchPath, numpyTypeSizesBytes } from "./utils";

export const useTiled = () => {
    //console.log('run useTiled.ts')

    const [ columns, setColumns ] = useState<TiledSearchResult[]>([]);
    //const [ previewVisibility, setPreviewVisibility ] = useState<boolean>(false);
    //const [ ancestors, setAncestors ] = useState<string[]>(['']);
    const [ breadcrumbs, setBreadcrumbs ] = useState<Breadcrumb[]>([]);
    const [ imageUrl, setImageUrl ] = useState<string | undefined>();
    const [ popoutUrl, setPopoutUrl ] = useState<string | undefined>();
    const [ previewSize, setPreviewSize ] = useState<PreviewSize>('hidden');
    const [ arrayItem, setArrayItem ] = useState<TiledSearchItem<ArrayStructure> | null>(null);
    const ancestorStack = useRef<TiledSearchItem<TiledStructures>[]>([]);
    const currentAncestorId = useRef<number>(-1);


    var handleLeftArrowClick:Function;
    var handleRightArrowClick:Function;
    //Update the arrow click functions so they always have the correct pathing.
    //there may be a better way to do this without relying on state updates re-running 'useTiled.ts' and
    //subsequently recreating these functions, but this does work and eleminates the <TiledHeader /> component
    //from needing to know anything related to the business logic.
    if (currentAncestorId.current > -1) {
        handleLeftArrowClick = () => {
            console.log('current ID before subtracting is: ' + currentAncestorId.current)
            currentAncestorId.current = currentAncestorId.current - 1;
            if (currentAncestorId.current < 0) {
                //uesr has clicked back onto the root directory
                getSearchResults('', (res:TiledSearchResult) => setColumns([res]));
                setBreadcrumbs([]);
                setImageUrl('');
                setPopoutUrl('');
                setPreviewSize('hidden');
            } else {
                //user has clicked back onto a container.
                const item = ancestorStack.current[currentAncestorId.current]; 
                updateCurrentSelectedItem(item);
            }
        };
    }

    if (currentAncestorId.current + 1 < ancestorStack.current.length) {
        handleRightArrowClick = () => {
            currentAncestorId.current = currentAncestorId.current + 1;
            const item = ancestorStack.current[currentAncestorId.current];
            updateCurrentSelectedItem(item);
        }

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

    const updateAncestorRefs = (item:TiledSearchItem<TiledStructures>) => {
        //this function is only called when the user navigates by directly clicking an item, not using the nav arrows
        currentAncestorId.current = item.attributes.ancestors.length;
        ancestorStack.current = ancestorStack.current.slice(0, currentAncestorId.current);
        ancestorStack.current = [...ancestorStack.current, item];
    }
    const handleColumnItemClick = useCallback((item:TiledSearchItem<TiledStructures>) => {
        updateAncestorRefs(item);
        updateCurrentSelectedItem(item);
    }, []);

    const updateCurrentSelectedItem = (item:TiledSearchItem<TiledStructures>) => {
        if (isArrayStructure(item)) {
            handleArrayClick(item); 
          } else if (isTableStructure(item)) {
            handleTableClick(item); 
          } else if (isContainerStructure(item)) {
            handleContainerClick(item); 
          } else {
            console.error('Error: No matching structure family found for: ' + item.attributes.structure_family);
          }
    }


    const handleArrayClick = useCallback((item:TiledSearchItem<ArrayStructure>) => {

        setArrayItem(item);
        updateBreadcrumbs(item);
        setPreviewSize(defaultPreviewSize);
        updateColumns(item);
/*         const arrayLength = item.attributes.structure.shape.length;
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
            const searchPath = generateSearchPath(item);
            const reducedImagePath = generateFullImagePngPath(searchPath, step, step);
            setImageUrl(reducedImagePath); //renders in the preview
            const fullSizeImagePath = generateFullImagePngPath(searchPath, 1);
            setPopoutUrl(fullSizeImagePath); //attaches to a click handler for when users want to see full image in new tab
            updateBreadcrumbs(item);
            setPreviewSize(defaultPreviewSize);
            updateColumns(item);
          } else {
            console.error(`Unknown data type kind: ${letter}`);
          }
        } */
    }, []);

    const handleTableClick = (item:any) => {
        //search table, put results into table preview and render preview
    };

    const handleContainerClick = (item:TiledSearchItem<ContainerStructure>) => {
        //search container, put results into column, disable preview
        const searchPath = generateSearchPath(item);
        getSearchResults(searchPath, (res:TiledSearchResult) => handleSearchResponse(item, res));
        closePreview();
    };

    const handleSearchResponse = useCallback((clickedItem:TiledSearchItem<TiledStructures>, res:TiledSearchResult) => {
        updateColumns(clickedItem, res);
        updateBreadcrumbs(clickedItem);
    }, []);

    const logResponse = (response:any) => {
        console.log({response});
    };

    const initializeData = (result:TiledSearchResult) => {
        setColumns([result]);
    }

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
        arrayItem,
        handleColumnItemClick,
        handleLeftArrowClick,
        handleRightArrowClick,
    }), [columns, breadcrumbs, imageUrl, popoutUrl, previewSize, handleColumnItemClick])

}