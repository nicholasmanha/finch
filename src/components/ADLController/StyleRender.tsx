import React from 'react';
import { Entry } from './types/ADLEntry';
import { replaceArgs } from './utils/ArgsFill';

export type DeviceRenderProps = {
  ADLEntry: Entry;
  val?: string | number | boolean;
  vis?: string;
  dynamic?: boolean;
  [key: string]: any;
};

function StyleRender({ ADLEntry, val, vis, dynamic, ...args }: DeviceRenderProps) {

  const name = replaceArgs(ADLEntry.name, args); // replaces P and R with 13SIM1 and cam1 e.g.
  const { x, y } = ADLEntry.location;
  const { width, height } = ADLEntry.size;
  
  const commonProps = {
    className: "absolute",
    style: { 
      left: `${x}px`, 
      top: `${y}px`, 
      width: `${width}px`, 
      height: `${height}px` 
    },
    children: name // automatically gets put inside div
  };

  // Spreads out all key value pairs of the common props to an empty div if it isn't dynamic (its just static text)
  if (!dynamic) {
    return <div {...commonProps} />;
  }

  const visibilityConditions: Record<string, boolean> = {
    "if zero": val === 0,
    "if not zero": val !== 0,
  };

  // visibilityConditions[vis] takes in vis, which is either "if zero" or "if not zero", so this line asks if
  // vis is defined and either val === 0 or val !== 0 thru visibilityConditions
  
  if (vis && visibilityConditions[vis]) {
    return <div {...commonProps} />;
  }

  return null; // fallback condition
}

export default StyleRender;