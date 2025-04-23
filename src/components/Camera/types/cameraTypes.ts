export interface DetectorSetting {
    title: string;
    icon: null | JSX.Element;
    prefix: string;
    inputs: DetectorInput[];
}

//we only need float, integer, enum for the current camera app
//but technically for EPICS we could have string and boolean too
export interface DetectorInput {
    suffix: string;
    label: string;
    type: 'enum' | 'float' | 'integer' | 'string' | 'boolean';
    min?: number;
    max?: number;
    enums?: string[];
}

export interface EnumProperties {
    enums: string[];
}

export interface NumberProperties {
    min: number;
    max: number;
}

export interface IntegerProperties extends NumberProperties {
}

export interface FloatProperties extends NumberProperties {
}


export type DetectorProperties = EnumProperties | NumberProperties | IntegerProperties | FloatProperties;

export interface CameraSettingsState {
    [key: string]: {
        value: string | number | boolean | null;
        lastUpdated: number;
        pv: string;
        isConnected: boolean;
    };
}