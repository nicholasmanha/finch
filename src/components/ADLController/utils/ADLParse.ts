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
        
    });
    return entries;
  }