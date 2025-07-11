import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { Devices } from "@/types/deviceControllerTypes";
import { Entry } from "./types/UIEntry";
import StyleRender from "./StyleRender";
import DeviceRender from "./DeviceRender";
import { ADLParser } from "./utils/ADLParse";
import useOphydSocket from "@/hooks/useOphydSocket";
import * as ADLs from "./utils/adl";
import { parseCustomFormat } from "./utils/ADLtoJSON";
import { replaceArgs } from "./utils/ArgsFill";
import { createDeviceNameArray } from "./utils/CreateDeviceNameArray";
import { CompositeDeviceRenderer } from "./Comp";

export type ADLCanvasProps = {
  devices: Devices;
  ADLData: Entry[];
  onSubmit?: (pv: string, value: string | boolean | number) => void;
  style?: React.CSSProperties;
  [key: string]: any;
};

function renderStyleComponent(
  device: Entry,
  index: number,
  devices: Devices,
  args: { [key: string]: any }
): React.ReactElement {
  if (device.dynamic_attribute) {
    // turn pv into "13SIM1:cam1:pv"
    const pv = replaceArgs(device.dynamic_attribute.chan, args);

    return (
      <React.Fragment key={index}>
        <StyleRender
          ADLEntry={device}
          dynamic={true}
          val={devices[pv]?.value}
          vis={device.dynamic_attribute.vis}
          {...args}
        />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment key={index}>
      <StyleRender ADLEntry={device} dynamic={false} {...args} />
    </React.Fragment>
  );
}

function renderDeviceComponent(
  ADLEntry: Entry,
  index: number,
  devices: Devices,
  args: { [key: string]: any },
  onSubmit: (pv: string, value: string | boolean | number) => void
): React.ReactElement {
  let pv = replaceArgs(ADLEntry.name, args);

  return (
    <React.Fragment key={index}>
      <DeviceRender
        PV={devices[pv]}
        ADLEntry={ADLEntry}
        onSubmit={onSubmit}
        {...args}
      />
    </React.Fragment>
  );
}

function renderCompComponent(
  device: Entry,
  index: number,
  args: { [key: string]: any }
): JSX.Element | undefined {
  return (
    <CompositeDeviceRenderer
      device={device}
      index={index}
      args={args}
    />
  );
}

function ADLCanvas({
  ADLData,
  devices,
  onSubmit = () => { },
  style,
  ...args
}: ADLCanvasProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // load adl files from the local finch repo
  const local = true

  // get display dimensions
  useEffect(() => {
    const displayDevice = ADLData.find(
      (device) => device.var_type === "display"
    );
    if (displayDevice?.size) {
      setDimensions(displayDevice.size);
    }
  }, [ADLData]);

  // Calculate height from rendered children when no explicit height is set
  useEffect(() => {
    if (dimensions.height === 0 && containerRef.current) {
      // Use a small delay to ensure all components are rendered
      const timer = setTimeout(() => {
        if (containerRef.current) {
          const children = containerRef.current.children;
          let maxBottom = 0;
          
          for (let i = 0; i < children.length; i++) {
            const child = children[i] as HTMLElement;
            const rect = child.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            const bottom = rect.bottom - containerRect.top;
            maxBottom = Math.max(maxBottom, bottom);
          }
          
          if (maxBottom > 0) {
            setDimensions(prev => ({ ...prev, height: maxBottom }));
          }
        }
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [ADLData, dimensions.height]);

  const renderDevices = () => {
    return ADLData.map((device: Entry, index: number) => {
      switch (device.var_type) {
        case "text":
          return renderStyleComponent(device, index, devices, args);
        case "rectangle":
          return renderStyleComponent(device, index, devices, args);
        case "composite":
          return renderCompComponent(device, index, args);
        default:
          return renderDeviceComponent(device, index, devices, args, onSubmit);
      }
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: `${dimensions.width}px`,
        height: dimensions.height > 0 ? `${dimensions.height}px` : 'auto',
        minHeight: dimensions.height === 0 ? '1px' : undefined,
        ...style,
      }}
      className="relative"
    >
      {renderDevices()}
    </div>
  );
}

export default ADLCanvas;