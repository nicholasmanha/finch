import { Entry } from "../types/ADLEntry";

export function parseXMLToEntries(xmlString: string): Entry[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const entries: Entry[] = [];

    // Parse the display element itself
    const displayElement = xmlDoc.querySelector('display');
    if (displayElement) {
        const displayEntry: Entry = {
            var_type: "display",
            location: {
                x: parseInt(getElementText(displayElement, 'x') || '0'),
                y: parseInt(getElementText(displayElement, 'y') || '0')
            },
            size: {
                width: parseInt(getElementText(displayElement, 'width') || '0'),
                height: parseInt(getElementText(displayElement, 'height') || '0')
            },
            name: "display"
        };
        entries.push(displayEntry);
    }

    // Parse all top-level widgets
    const topLevelWidgets = xmlDoc.querySelectorAll('display > widget');
    topLevelWidgets.forEach(widget => {
        const type = widget.getAttribute('type');
        if (!type) return;

        const entry = parseWidget(widget, type);
        if (entry) {
            entries.push(entry);
        }
    });

    return entries;
}

function parseWidget(widget: Element, type: string): Entry | null {
    const name = getElementText(widget, 'name') || '';
    const x = parseInt(getElementText(widget, 'x') || '0');
    const y = parseInt(getElementText(widget, 'y') || '0');
    const width = parseInt(getElementText(widget, 'width') || '0');
    const height = parseInt(getElementText(widget, 'height') || '0');

    const baseEntry = {
        location: { x, y },
        size: { width, height }
    };

    switch (type) {
        case 'rectangle':
            return {
                var_type: "rectangle",
                ...baseEntry,
                name: "rectangle"
            };

        case 'group':
            // Parse child widgets
            const childWidgets = Array.from(widget.children).filter(child =>
                child.tagName === 'widget'
            );

            const children: Entry[] = [];
            childWidgets.forEach(childWidget => {
                const childType = childWidget.getAttribute('type');
                if (childType) {
                    const childEntry = parseWidget(childWidget as Element, childType);
                    if (childEntry) {
                        children.push(childEntry);
                    }
                }
            });

            return {
                var_type: "composite",
                ...baseEntry,
                name: "",
                children: children
            };

        case 'embedded':
            const file = getElementText(widget, 'file') || '';
            return {
                var_type: "composite",
                ...baseEntry,
                name: "",
                comp_file: file
            };

        case 'label':
            const text = getElementText(widget, 'text') || '';
            const horizontalAlignment = getElementText(widget, 'horizontal_alignment');

            const labelEntry: Entry = {
                var_type: "text",
                ...baseEntry,
                name: text
            };

            // Map horizontal alignment values
            if (horizontalAlignment === '1') {
                labelEntry.align = "horiz. centered";
            } else if (horizontalAlignment === '2') {
                labelEntry.align = "horiz. right";
            }
            // Note: horizontalAlignment === '0' would be left-aligned (default), so no align property needed

            return labelEntry;
        case 'textupdate':
            const pvName = getElementText(widget, 'pv_name') || '';
            return {
                var_type: "update",
                ...baseEntry,
                name: pvName
            };

        default:
            // For unknown widget types, create a generic entry
            return {
                var_type: type,
                ...baseEntry,
                name: name
            };
    }
}

function getElementText(parent: Element, tagName: string): string | null {
    const element = parent.querySelector(tagName);
    return element ? element.textContent?.trim() || null : null;
}