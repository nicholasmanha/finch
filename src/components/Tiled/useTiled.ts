import { useEffect, useState, useRef } from "react";

import { getSearchResults } from "./apiClient";
import { TiledSearchResult, TiledSearchItem } from "./types";

export const useTiled = () => {

    const [ columns, setColumns ] = useState<TiledSearchResult[]>([]);
    const [ previewVisibility, setPreviewVisibility ] = useState<boolean>(false);
    const [ ancestors, setAncestors ] = useState<string[]>(['']);

    const handleColumnsUpdate = (newColumn:TiledSearchResult, currentColumns:TiledSearchResult[], ancestors:string[]) => {
        //update column state for the most recent search result
        //requires most recent column and ancestor state, must call function from inside component with that state available
        //function assumes that user can not arbitrarily pass in a search result that is not based off the current available column data
        var columnsCopy = JSON.parse(JSON.stringify(currentColumns));
        const newColumnCount = ancestors.length + 1;
        while (columnsCopy.length > newColumnCount) {
            columnsCopy.pop();
        }
        //on first search the columns array is empty, over write with search result
        if (columnsCopy.length === 0) {
            columnsCopy = newColumn;
        } else {
            columnsCopy.push(newColumn);
        }
        setColumns(columnsCopy);
    };

    const handleAncestorUpdate = (searchResult:TiledSearchResult, ancestors:string[]) => {
        //is search empty?
        //TODO - check if there is a condition where data can return an empty object, which has array length > 0
        if (searchResult.data.length === 0) {
            setAncestors(['']);
        } else {
            var firstItem = searchResult.data[0];
            setAncestors(firstItem.attributes.ancestors);
        }
    };

    const handlePreviewUpdate = (item:any, format:'array' | 'table') => {
        //renders either an array component or table component

        //set the preview component display to visible
    };

    const closePreview = () => {
        //remove the preview component from display
    }

    const handleColumnItemClick = (item:TiledSearchItem, ancestors:string[]) => {
        console.log({item});
        console.log({ancestors});
        //need three functions
        if (item.attributes.structure_family === 'array') {
            handleArrayClick(item);
        } else {
            if (item.attributes.structure_family === 'table') {
                handleTableClick(item);
            } else {
                if (item.attributes.structure_family === 'container') {
                    handleContainerClick(item);
                }
            }
        }
    };

    const handleArrayClick = (item:any) => {
        //search array, put results into array preview and render preview
    };

    const handleTableClick = (item:any) => {
        //search table, put results into table preview and render preview
    };

    const handleContainerClick = (item:TiledSearchItem) => {
        //search container, put results into column, disable preview
        console.log('handle container click')
    }

    const logResponse = (response:any) => {
        console.log({response});
    }
    useEffect(() => {
        //make the api call
        getSearchResults('', (res:TiledSearchResult) => setColumns([res]));
    }, []);

    return {
        columns,
        previewVisibility,
        ancestors,
        handleColumnItemClick
    };

}