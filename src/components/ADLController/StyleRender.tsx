import React from 'react'
import { Entry } from './types/ADLEntry';

export type DeviceRenderProps = {
    ADLEntry: Entry;
    val?: string | number | boolean;
}

function StyleRender({ADLEntry, val }: DeviceRenderProps) {
  return <div className="absolute"
                        style={{ left: `${ADLEntry.location.x}px`, top: `${ADLEntry.location.y}px`, width: `${ADLEntry.size.width}px`, height: `${ADLEntry.size.height}px` }}>{ADLEntry.name}</div>
}

export default StyleRender