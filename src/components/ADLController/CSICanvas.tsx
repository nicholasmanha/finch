import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Devices } from "@/types/deviceControllerTypes";
import { Entry } from "./types/ADLEntry";
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
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        ...style,
      }}
      className="relative"
    >
      {renderDevices()}
    </div>
  );
}

export default ADLCanvas;