import { Browsers } from '@phosphor-icons/react';
import React, { CSSProperties, useState } from 'react'
import { useTabManagement } from '../Tabs/context/TabsContext';
import { Entry } from "./types/ADLEntry";
import ADLView from './ADLView';

type RelatedDispProps = {
    label?: string;
    style?: CSSProperties;
    fileArray: Entry["display"]
}

function RelatedDisp({
    fileArray,
    label = '',
    style
}: RelatedDispProps) {
    const { addTab } = useTabManagement();

    const handleCreateTab = () => {
        const tabContent = (
            <ADLView fileName={fileArray![0].file} />
        );

        addTab('Dynamic Tab', tabContent);
    };
    return (
        <button
            onClick={handleCreateTab}
            className={`
                
                
                bg-blue-500 text-white hover:bg-blue-600
                rounded border border-slate-300 transition-all duration-100
                focus:outline-none focus:ring-2 focus:ring-blue-300
                flex flex-col justify-center
            `}
            style={style}
        >
            {label ? <small className="text-xs">{label}</small> : <small className="text-xs flex justify-center"><Browsers size={16} /></small>}

        </button>
    )
}

export default RelatedDisp