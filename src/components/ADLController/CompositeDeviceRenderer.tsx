import { useCallback, useEffect, useMemo, useState } from "react";
import { Entry } from "./types/ADLEntry";
import { ADLParser } from "./utils/ADLParse";
import { parseCustomFormat } from "./utils/ADLtoJSON";
import { createDeviceNameArray } from "./utils/CreateDeviceNameArray";
import { fetchADLFile } from "./utils/GithubFetch";
import useOphydSocket from "@/hooks/useOphydSocket";
import React from "react";
import ADLCanvas from "./ADLCanvas";

export function CompositeDeviceRenderer({ device, index, args }: {
    device: Entry; index: number; args: { [key: string]: any };
}): JSX.Element {
    const [adlData, setAdlData] = useState<Entry[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [canvasStyle, setCanvasStyle] = useState({
        position: "absolute" as const,
        left: `${device.location.x}px`,
        top: `${device.location.y}px`,
    });

    useEffect(() => {
        if (device.comp_file !== undefined) {
            const fileNameNoADL: string = device.comp_file.split(".")[0];

            const loadADLFile = async () => {
                setLoading(true);
                setError(null);

                try {
                    const adlContent = await fetchADLFile(fileNameNoADL);

                    if (!adlContent) {
                        setError(`${device.comp_file} not found`);
                        return;
                    }

                    const parsedData = ADLParser(parseCustomFormat(adlContent));
                    setAdlData(parsedData);
                } catch (err) {
                    setError(`Error loading ${device.comp_file}`);
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            loadADLFile();
        } else if (device.children !== undefined) {
            // if the composite has children, ignore the device.location (set left and top to 0px) because it is already covered by the location of the canvas component
            setCanvasStyle({
                position: "absolute" as const,
                left: "0px",
                top: "0px"
            });
            setAdlData(device.children);
        }
    }, [device.comp_file, device.children]);

    const deviceNames = useMemo(() => {
        if (!adlData) return [];
        return createDeviceNameArray(adlData, args);
    }, [adlData, args]);

    const { devices, handleSetValueRequest } = useOphydSocket(deviceNames);
    const onSubmitSettings = useCallback(handleSetValueRequest, []);

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

    if (!adlData) {
        return <div style={canvasStyle}></div>;
    }

    return (
        <React.Fragment key={index}>
            <ADLCanvas
                ADLData={adlData}
                devices={devices}
                onSubmit={onSubmitSettings}
                style={canvasStyle}
                {...args}
            />
        </React.Fragment>
    );
}