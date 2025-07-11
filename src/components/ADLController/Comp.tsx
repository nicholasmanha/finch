import React, { useEffect, useState } from "react";
import { Entry } from "./types/UIEntry";
import ADLCanvas from "./CSICanvas";
import { useADLData } from "./utils/useUIData";

export function CompositeDeviceRenderer({ device, index, args }: {
    device: Entry; 
    index: number; 
    args: { [key: string]: any };
}): JSX.Element {
    const [canvasStyle, setCanvasStyle] = useState({
        position: "absolute" as const,
        left: `${device.location.x}px`,
        top: `${device.location.y}px`,
    });

    const { ADLData, loading, error, devices, onSubmitSettings } = useADLData({
        fileName: device.comp_file,
        children: device.children,
        args
    });

    useEffect(() => {
        // If the composite has children, ignore the device.location 
        // (set left and top to 0px) because it is already covered by the location of the canvas component
        if (device.children !== undefined) {
            setCanvasStyle({
                position: "absolute" as const,
                left: "0px",
                top: "0px"
            });
        }
    }, [device.children]);

    if (loading) {
        return (
            <div className="text-blue-500" style={canvasStyle}>
                Loading {device.comp_file}...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500" style={canvasStyle}>
                {error}
            </div>
        );
    }

    if (!ADLData) {
        return <div style={canvasStyle}></div>;
    }

    return (
        <React.Fragment key={index}>
            <ADLCanvas
                ADLData={ADLData}
                devices={devices}
                onSubmit={onSubmitSettings}
                style={canvasStyle}
                {...args}
            />
        </React.Fragment>
    );
}