import { tiledStructureIcons } from "./icons";

export const getTiledStructureIcon = (structureFamily:string) => {
    var icon = tiledStructureIcons.question;
    if (structureFamily === 'array' || structureFamily === 'awkward' || structureFamily === 'sparse') {
        icon = tiledStructureIcons.brackestSqaure;
    }
    if (structureFamily === 'table') {
        icon = tiledStructureIcons.table;
    }
    if (structureFamily === 'container') {
        icon = tiledStructureIcons.folder;
    }

    return icon;
};