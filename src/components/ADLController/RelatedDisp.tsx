import { Browsers } from '@phosphor-icons/react';
import React, { CSSProperties, useState } from 'react'
import { useTabManagement } from '../Tabs/context/TabsContext';

type RelatedDispProps = {
    label?: string;
    style?: CSSProperties;
}

function RelatedDisp({
    label = '',
    style
}: RelatedDispProps) {
    const { addTab } = useTabManagement();

    const handleCreateTab = () => {
        const tabContent = (
            <div>
                <h3 className="text-lg font-semibold">New Tab Content</h3>
                <p>This tab was created from a deep component!</p>
            </div>
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