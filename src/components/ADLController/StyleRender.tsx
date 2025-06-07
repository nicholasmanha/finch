import React from 'react'
import { Entry } from './types/ADLEntry';

export type DeviceRenderProps = {
    ADLEntry: Entry;
}

function StyleRender({ADLEntry }: DeviceRenderProps) {
  return (
    <div>{ADLEntry.name}</div>
  )
}

export default StyleRender