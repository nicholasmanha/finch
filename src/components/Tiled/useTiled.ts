import { useEffect, useState, useRef } from "react";

import { getSearchResults } from "./apiClient";
import { TiledSearchResult, TiledSearchItem } from "./types";

export const useTiled = () => {

    const [ columns, setColumns ] = useState<TiledSearchResult[]>([]);
    const [ previewVisibility, setPreviewVisibility ] = useState<boolean>(false);

    const handleColumnsUpdate = (newColumn:any, currentColumns:[], ancestors:string[]) => {
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

    const handlePreviewUpdate = (item:any, format:'array' | 'table') => {
        //renders either an array component or table component

        //set the preview component display to visible
    };

    const closePreview = () => {
        //remove the preview component from display
    }

    const handleColumnItemClick = (item:any) => {
        //need three functions
        if (item.structure_family === 'array') {
            handleArrayClick(item);
        } else {
            if (item.structure_family === 'table') {
                handleTableClick(item);
            } else {
                if (item.structure_family === 'container') {
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

    const handleContainerClick = (item:any) => {
        //search container, put results into column, disable preview
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
        previewVisibility
    };

}