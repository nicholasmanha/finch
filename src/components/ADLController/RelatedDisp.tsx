import { Browsers } from '@phosphor-icons/react';
import React, { CSSProperties, useEffect, useRef, useState } from 'react'
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
    console.log(fileArray)
    const handleCreateTab = () => {
        const tabContent = (
            <ADLView fileName={fileArray![0].file} />
        );

        addTab(fileArray![0].file, tabContent);
    };


    const [dropdownVisible, setDropdownVisible] = useState(false);
    const containerRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: { target: any; }) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputClick = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <>

            {fileArray?.length === 1 ?

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
                :
                <div ref={containerRef} className={'w-1/2 border bg-white border-slate-300 flex w-full max-w-64'} style={style}>
                    <div className={` flex flex-col w-full`} onClick={handleInputClick}>
                        <div className="bg-blue-500 text-white hover:bg-blue-600
                rounded border border-slate-300 transition-all duration-100
                focus:outline-none focus:ring-2 focus:ring-blue-300
                flex flex-col justify-center">
                            {label ? <small className="text-xs">{label}</small> : <small className="text-xs flex justify-center"><Browsers size={16} /></small>}
                        </div>
                        <span className="relative w-full">
                            {dropdownVisible && (
                                <ul className="z-10 absolute w-full top-0 bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-auto">
                                    {fileArray!.map((item, index) => (
                                        <li
                                            key={index}
                                            onClick={handleCreateTab}
                                            className={`p-2 cursor-pointer hover:bg-gray-200 `}
                                        >
                                            {item.label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </span>
                    </div>
                </div>
            }
        </>
    )
}

export default RelatedDisp