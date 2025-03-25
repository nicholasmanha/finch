import { StringLiteral } from "typescript";

export interface PopupItem {
    name: string;
    kwargs: { [key: string]: any };
    item_uid: string;
    user: string;
    user_group: string;
    result?: {
        exit_status: string;
        time_start: number;
        time_stop: number;
        run_uids: string[];
        scan_ids: string[];
        traceback: string;
        msg: string;
    };
};

export interface HistoryResultRow {
    name: string;
    icon: JSX.Element;
    content: JSX.Element | null;
};

export interface apiDeleteItemResponse {
    success: boolean;
    msg: string;
    item: {
        name: string;
        kwargs: {
            detectors: string[];
            num: number;
        };
        item_type: string;
        user: string;
        user_group: string;
        item_uid: string;
    };
    qsize: number;
};

export interface Component {
    is_readable: boolean;
    is_movable: boolean;
    is_flyable: boolean;
    classname: string;
    module: string;
    components?: { [key: string]: Component };
}

export interface Device {
    is_readable: boolean;
    is_movable: boolean;
    is_flyable: boolean;
    classname: string;
    module: string;
    components?: { [key: string]: Component };
}

export interface DevicesAllowedResponse {
    success: boolean;
    msg: string;
    devices_allowed: { [key: string]: Device };
    devices_allowed_uid: string;
}

export interface Parameter {
    name: string;
    kind: {
        name: string;
        value: number;
    };
    description?: string;
    default?: string;
    annotation?: {
        type: string;
        devices?: { [key: string]: string[] };
    };
}

export interface Plan {
    name: string;
    properties: {
        is_generator: boolean;
    };
    parameters: Parameter[];
    module: string;
    description: string;
}

export interface PlansAllowedResponse {
    success: boolean;
    msg: string;
    plans_allowed: { [key: string]: Plan };
    plans_allowed_uid: string;
}

export interface QueueItem {
    name: string;
    kwargs: { [key: string]: any };
    item_type: string;
    user: string;
    user_group: string;
    item_uid: string;
}

export interface GetQueueItemResponse {
    msg: string;
    item: QueueItem;
}

export interface GetQueueResponse {
    success: boolean;
    msg: string;
    items: QueueItem[];
    plan_queue_uid: string;
    running_item: QueueItem; //double check this later, just guessing 
}

export interface Result {
    exit_status: string;
    run_uids: string[];
    scan_ids: number[];
    time_start: number;
    time_stop: number;
    msg: string;
    traceback: string;
}

export interface HistoryItem extends QueueItem {
    result: Result;
}

export interface HistoryDataResponse {
    success: boolean;
    msg: string;
    items: HistoryItem[];
    plan_history_uid: string;
}