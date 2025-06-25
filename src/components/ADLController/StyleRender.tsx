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
  const name = replacePVars(ADLEntry.name); // Safe even if ADLEntry.name is undefined
  
  if (!dynamic) {
    return (
      <div 
        className="absolute"
        style={{ 
          left: `${ADLEntry.location.x}px`, 
          top: `${ADLEntry.location.y}px`, 
          width: `${ADLEntry.size.width}px`, 
          height: `${ADLEntry.size.height}px` 
        }}
      >
        {name}
      </div>
    );
  } else {
    if (vis === "if zero") {
      return val === 0 ? (
        <div 
          className="absolute"
          style={{ 
            left: `${ADLEntry.location.x}px`, 
            top: `${ADLEntry.location.y}px`, 
            width: `${ADLEntry.size.width}px`, 
            height: `${ADLEntry.size.height}px` 
          }}
        >
          {name}
        </div>
      ) : null;
    } else if (vis === "if not zero") {
      return val !== 0 ? (
        <div 
          className="absolute"
          style={{ 
            left: `${ADLEntry.location.x}px`, 
            top: `${ADLEntry.location.y}px`, 
            width: `${ADLEntry.size.width}px`, 
            height: `${ADLEntry.size.height}px` 
          }}
        >
          {name}
        </div>
      ) : null;
    }
  }

  return null; // Fallback if no conditions match
}

export default StyleRender;