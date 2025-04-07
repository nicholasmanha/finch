//Types for the responses and calls made to ophydSocket.py


//Responses
export interface MessageResponse {
    message: string;
}

export interface ErrorResponse {
    error: string;
}

export interface ValueUpdateResponse {
    pv: string;
    value: string | number | boolean;
    timestamp: number;
    connected: boolean;
    read_access: boolean;
    write_access: boolean;
}

export interface MetaUpdateResponse extends ValueUpdateResponse {
    status: number;
    severity: number;
    precision: number;
    setpoint_timestamp: null | number;
    setpoint_status: null | number;
    setpoint_severity: null | number;
    lower_ctrl_limit: null | number;
    upper_ctrl_limit: null | number;
    units: string;
    enum_strs: null | string[];
    setpoint_precision: null | number;
    sub_type: 'meta';
}

//Requests

export interface ActionRequest {
    action: 'subscribe' | 'subscribeSafely' | 'subscribeReadOnly' | 'unsubscribe' | 'refresh' | 'set';
    pv?: string;
    value?: string | number | boolean;
}

export interface ActionRequestSubscribe {
    action: 'subscribe' | 'subscribeSafely' | 'subscribeReadOnly';
    pv: string;
}

export interface ActionRequestUnsubscribe {
    action: 'unsubscribe';
    pv: string;
}

export interface ActionRequestRefresh {
    action: 'refresh';
}

export interface ActionRequestSet {
    action: 'set';
    pv: string;
    value: string | number | boolean;
}