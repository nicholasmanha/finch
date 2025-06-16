import React from 'react'
import { Entry } from './types/ADLEntry';

export type DropdownProps = {
    ADLEntry: Entry;
}

function Dropdown( {ADLEntry }: DropdownProps) {
    return (
        <>
            <div className="absolute"
                style={{ left: `${ADLEntry.location.x}px`, top: `${ADLEntry.location.y}px`, width: `${ADLEntry.size.width}px`, height: `${ADLEntry.size.height}px` }}>
                <select name="cars" id="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
            </div>
        </>

    )
}

export default Dropdown