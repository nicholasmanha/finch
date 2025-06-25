import React from 'react'
import { Entry } from './types/ADLEntry';

export type DeviceRenderProps = {
  ADLEntry: Entry;
  val?: string | number | boolean;
  vis?: string
  dynamic?: boolean
}

function StyleRender({ ADLEntry, val, vis, dynamic}: DeviceRenderProps) {
  if (!dynamic) {
    
    return <div className="absolute"
      style={{ left: `${ADLEntry.location.x}px`, top: `${ADLEntry.location.y}px`, width: `${ADLEntry.size.width}px`, height: `${ADLEntry.size.height}px` }}>{ADLEntry.name}</div>
  }
  else{
    
    if (vis === "if zero") {
      if (val === 0) {
        return <div className="absolute"
          style={{ left: `${ADLEntry.location.x}px`, top: `${ADLEntry.location.y}px`, width: `${ADLEntry.size.width}px`, height: `${ADLEntry.size.height}px` }}>{ADLEntry.name}</div>
      }
      else {
        return <></>
      }
    }
    else if (vis === "if not zero") {
      if (val === 0) {
        return <></>
      }
      else {
        return <div className="absolute"
          style={{ left: `${ADLEntry.location.x}px`, top: `${ADLEntry.location.y}px`, width: `${ADLEntry.size.width}px`, height: `${ADLEntry.size.height}px` }}>{ADLEntry.name}</div>
      }
    }
  }


}

export default StyleRender