import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

export type UICanvasProps = {
  devices: Devices;
  UIData: Entry[];
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

function CSICanvas({
  UIData,
  devices,
  onSubmit = () => { },
  style,
  ...args
}: UICanvasProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // load adl files from the local finch repo
  const local = true

  // get display dimensions
  useEffect(() => {
    const displayDevice = UIData.find(
      (device: Entry) => device.var_type === "display"
    );
    if (displayDevice?.size) {
      setDimensions(displayDevice.size);
    }
  }, [UIData]);

  // Calculate height from rendered children when no explicit height is set
  useEffect(() => {
    if (dimensions.height === -1 && containerRef.current) {
      const measureHeight = () => {
        if (containerRef.current) {
          const children = containerRef.current.children;

          // Check if all children are rendered (have non-zero dimensions)
          const allChildrenRendered = Array.from(children).every(child => {
            const rect = (child as HTMLElement).getBoundingClientRect();
            return rect.width > 0 || rect.height > 0;
          });

          if (allChildrenRendered && children.length > 0) {
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
          } else {
            // Retry after a short delay if children aren't ready
            setTimeout(measureHeight, 10);
          }
        }
      };

      // Start with a small delay to allow initial render
      setTimeout(measureHeight, 50);
    }
  }, [UIData, dimensions.height]);

  const renderDevices = () => {
    return UIData.map((device, index: number) => {
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

export default CSICanvas;