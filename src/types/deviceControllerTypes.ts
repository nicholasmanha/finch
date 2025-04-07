//Everything related to EPICS / OPHYD device

export interface Device {
    min?: number | null;
    max?: number | null;
    name: string;
    value: string | number | boolean;
    connected: boolean;
    locked: boolean;
    timestamp: number;
    expanded: boolean;
    units?: string;
};

export interface Devices {
    [key: string]: Device;
}