/**
* Finds the item content that needs to be exported in the modules.
*/
function findItemContent(lines, startIndex) {
    var startingLine = lines[startIndex], endIndex = startIndex;
    if (/^.*\{\s*$/.test(startingLine)) {
        while (!/^\s*\}\s*$/.test(lines[endIndex])) {
            endIndex++;
        }
    }
    var textWithDeclares = lines.slice(startIndex, endIndex + 1).join("\n") + "\n";
    textWithDeclares = textWithDeclares.replace(/^(\s*)declare function /, "$1export function ")
        .replace(/^(\s*)declare interface /, "$1export interface ")
        .replace(/^(\s*)declare class /, "$1export class ");
    return textWithDeclares;
}
exports.findItemContent = findItemContent;
