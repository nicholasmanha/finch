import { useEffect, useState, useRef } from "react";

import { getSearchResults } from "./apiClient";
import { TiledSearchResult, TiledSearchItem, Breadcrumb } from "./types";
import { tiledStructureIcons } from "./icons";

export const useTiled = () => {

    const [ columns, setColumns ] = useState<TiledSearchResult[]>([]);
    const [ previewVisibility, setPreviewVisibility ] = useState<boolean>(false);
    const [ ancestors, setAncestors ] = useState<string[]>(['']);
    const [ breadcrumbs, setBreadcrumbs ] = useState<Breadcrumb[]>([]);

    const updateColumns = (clickedItem:TiledSearchItem, newColumn?:TiledSearchResult ) => {
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

    const updateBreadcrumbs = (clickedItem:TiledSearchItem) => {
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

    const handleColumnItemClick = (item:TiledSearchItem) => {
        console.log({item});
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
        console.log('handle container click');
        const ancestors = item.attributes.ancestors;
        var searchPath:string = ancestors.length > 0 ? item.attributes.ancestors.join('/') + '/' : '';
        searchPath+=item.id;
        getSearchResults(searchPath, (res:TiledSearchResult) => handleSearchResponse(item, res));
        //getSearchResults(searchPath, (res:TiledSearchResult) => logResponse(res));

    };

    const handleSearchResponse = (clickedItem:TiledSearchItem, res:TiledSearchResult) => {
        updateColumns(clickedItem, res);
        updateBreadcrumbs(clickedItem);
    }

    const handleSearchResults = (res:TiledSearchResult) => {

    }

    const logResponse = (response:any) => {
        console.log({response});
    };

    useEffect(() => {
        //make the api call
        getSearchResults('', (res:TiledSearchResult) => setColumns([res]));
    }, []);

    return {
        columns,
        previewVisibility,
        ancestors,
        handleColumnItemClick,
        breadcrumbs,
        updateColumns
    };

}