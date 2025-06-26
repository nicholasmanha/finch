import React from 'react';
import { Entry } from './types/ADLEntry';

export type DeviceRenderProps = {
  ADLEntry: Entry;
  val?: string | number | boolean;
  vis?: string;
  dynamic?: boolean;
};

const P = "13SIM1";
const R = "cam1";

// Safe replacement function (handles undefined/null)
function replacePVars(input: string | undefined): string {
    if (!input) return ''; // Return empty string if input is undefined/null
    
    // Replace all occurrences of "$(P)$(R)" with `${P}:${R}`
    return input.replace(/\$\(P\)\$\(R\)/g, `${P}:${R}`);
}

function StyleRender({ ADLEntry, val, vis, dynamic }: DeviceRenderProps) {
  const name = replacePVars(ADLEntry.name); // replaces P and R with 13SIM1 and cam1 e.g.
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