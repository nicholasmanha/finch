import { Browsers } from '@phosphor-icons/react';
import React, { CSSProperties, useState } from 'react'

type RelatedDispProps = {
    label?: string;
    style?: CSSProperties;
}

function RelatedDisp({
    label = '',
    style
}: RelatedDispProps) {

    const [isPressed, setIsPressed] = useState(false);

    const handleClick = () => {
        setIsPressed(true);
        setTimeout(() => setIsPressed(false), 200);
    };

    return (
        <button
            onClick={handleClick}
            className={`
                
                ${isPressed ? 'transform scale-95' : ''}
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