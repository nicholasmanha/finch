import { Entry } from "../types/ADLEntry";

export function ADLParser(config: any[]): Entry[] {
    const entries: Entry[] = [];
    config.forEach((item: any) => {
      const keys = Object.keys(item);
      if(keys.includes("text entry")) {
        const textEntry = item["text entry"];
        const entry: Entry = {
          var_type:"entry",
          location: {
            x: textEntry.object.x,
            y: textEntry.object.y
          },
          size: {
            width:textEntry.object.width,
            height: textEntry.object.height
          },
          name: textEntry.control.chan
        }
        console.log("entry: ",entry)
        entries.push(entry);
      }
    });
    return entries;
  }