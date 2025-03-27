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
