 /**
 * Finds the item content that needs to be exported in the modules.
 */
export function findItemContent(lines : Array<string>, startIndex) {
	var startingLine = lines[startIndex],
		endIndex = startIndex;
	
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
