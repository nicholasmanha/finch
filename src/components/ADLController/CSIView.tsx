import { cn } from "@/lib/utils";
import CSICanvas from "./CSICanvas";
import { useUIData } from "./utils/useUIData";
import { useState, useRef, useCallback } from "react";
import React from "react";

export type CSIViewProps = {
  className?: string;
  fileName: string;
  [key: string]: any;
};

export default function CSIView({
  className,
  fileName,
  ...args
}: CSIViewProps) {
  const [scale, setScale] = useState(0.85);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startDataRef = useRef<{
    startX: number;
    startY: number;
    startScale: number;
  } | null>(null);

  // UIData is Entry[] (aka from the ADL/bob file), devices are the devices from the WS
  const { UIData, loading, error, devices, onSubmitSettings } = useUIData({
    fileName,
    args
  });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    
    startDataRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startScale: scale
    };
  }, [scale]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !startDataRef.current) return;

    const { startX, startY, startScale } = startDataRef.current;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    // Use the larger of the two deltas for scaling
    const delta = Math.max(deltaX, deltaY);
    const scaleFactor = 1 + (delta / 200); // Adjust sensitivity here
    const newScale = Math.max(0.3, Math.min(3.0, startScale * scaleFactor));
    
    setScale(newScale);
  }, [isResizing]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    startDataRef.current = null;
  }, []);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setScale(0.85);
  };

  // Add global mouse event listeners
  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  if (loading) {
    return (
      <div className={cn("inline-block rounded-xl bg-slate-100 p-4 mt-4", className)}>
        <div className="text-blue-500">Loading {fileName}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("inline-block rounded-xl bg-slate-100 p-4 mt-4", className)}>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!UIData) {
    return (
      <div className={cn("inline-block rounded-xl bg-slate-100 p-4 mt-4", className)}>
        <div className="text-white">No data available</div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={cn("inline-block rounded-xl bg-slate-100 p-4 mt-4 relative", className, {
        'select-none': isResizing
      })}
      style={{ 
        '--component-scale': scale,
        fontSize: `${scale}em`
      } as React.CSSProperties}
    >
      <CSICanvas
        UIData={UIData}
        devices={devices}
        onSubmit={onSubmitSettings}
        {...args}
      />
      
      {/* Resize handle */}
      <div
        className={`absolute bottom-0 right-0 w-4 h-4 bg-gray-400 cursor-se-resize transition-opacity ${
          isResizing ? 'opacity-100 bg-gray-600' : 'opacity-50 hover:opacity-100'
        }`}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
        style={{
          clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
          userSelect: 'none'
        }}
      />
    </div>
  );
}