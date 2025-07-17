import { cn } from "@/lib/utils";
import CSICanvas from "./CSICanvas";
import { useUIData } from "./utils/useUIData";
import { useState, useRef } from "react";
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
  const startPos = useRef({ x: 0, y: 0, scale: 0.85 });

  // UIData is Entry[] (aka from the ADL/bob file), devices are the devices from the WS
  const { UIData, loading, error, devices, onSubmitSettings } = useUIData({
    fileName,
    args
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    startPos.current = {
      x: e.clientX,
      y: e.clientY,
      scale: scale
    };
    console.log(scale)
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    const delta = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const direction = deltaX + deltaY > 0 ? 1 : -1;
    
    const newScale = Math.max(0.5, Math.min(3, startPos.current.scale + (direction * delta * 0.005)));
    setScale(newScale);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
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
  }, [isResizing]);

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
      className={cn("inline-block rounded-xl bg-slate-100 p-4 mt-4 relative", className)}
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
        className="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 cursor-nw-resize opacity-50 hover:opacity-100"
        onMouseDown={handleMouseDown}
        style={{
          clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
          userSelect: 'none'
        }}
      />
    </div>
  );
}