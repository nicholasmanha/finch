import { Entry } from "../types/ADLEntry";

export function ADLParser(config: any[]): Entry[] {
    const entries: Entry[] = [];
    config.forEach((item: any) => {
        if (item["text entry"]) {
            const textEntry = item["text entry"];
            entries.push({
                var_type: "entry",
                location: { x: textEntry.object.x, y: textEntry.object.y },
                size: { width: textEntry.object.width, height: textEntry.object.height },
                name: textEntry.control.chan
            });
        }

        if (item["text update"]) {
            const textUpdate = item["text update"];
            entries.push({
                var_type: "update",
                location: { x: textUpdate.object.x, y: textUpdate.object.y },
                size: { width: textUpdate.object.width, height: textUpdate.object.height },
                name: textUpdate.monitor.chan
            });
        }

        if (item["text"]) {
            const text = item["text"];
            entries.push({
                var_type: "text",
                location: { x: text.object.x, y: text.object.y },
                size: { width: text.object.width, height: text.object.height },
                name: text.textix
            });
        }
        if (item["display"]) {
            const text = item["display"];
            entries.push({
                var_type: "display",
                location: { x: text.object.x, y: text.object.y },
                size: { width: text.object.width, height: text.object.height },
                name: "display"
            });
        }
        if (item["menu"]) {
            const menu = item["menu"];
            entries.push({
                var_type: "menu",
                location: { x: menu.object.x, y: menu.object.y },
                size: { width: menu.object.width, height: menu.object.height },
                name: menu.control.chan
            });
        }
        if (item["message button"]) {
            const btn = item["message button"];
            entries.push({
                var_type: "button",
                location: { x: btn.object.x, y: btn.object.y },
                size: { width: btn.object.width, height: btn.object.height },
                name: btn.control.chan,
                label: btn.label,
                press_msg: btn.press_msg
            });
        }
    });
    return entries;
}