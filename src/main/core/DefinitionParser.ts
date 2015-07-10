/// <reference path="ExportedItem"/>
/// <reference path="JsDocTextSection"/>
/// <reference path="../../../typings/node/doctrine.d.ts"/>

import doctrine = require("doctrine");
import findItemContentModule = require("./findItemContent");
import findItemContent = findItemContentModule.findItemContent;

/**
 * Parses the definitions from the given .d.ts file content,
 * returning an array of items that have the @inmodule
 * JsDoc annotation.
 */
export class DefinitionParser {
	parseDefinitions(content : string) : Array<ExportedItem> {
		var result : Array<ExportedItem> = [];
		var lines = content.split(/[\r\n]+/);

		for (var i = 0; i < lines.length; i++) {
			if (isJsDocStart(lines[i])) {
				var jsDoc : JsDocTextSection = extractJsDoc(lines, i),
					inModulesExported : Array<string>;
				
				inModulesExported = readExportedModules(jsDoc.content);
				
				if (! inModulesExported.length) { // there are no @inmodule exports
					i = jsDoc.endingLine;
					continue;
				}
				
				var itemContent : string = jsDoc.content + 
						findItemContent(lines, jsDoc.endingLine + 1);
				

				result.push({
					modules : inModulesExported,
					item: itemContent
				});
			}
		}
		
		return result;
	}
}

/**
 * Checks if the given line is the start of a JsDoc comment. 
 */
function isJsDocStart(line : string) : boolean {
	return /^\s*\/\*\*\s*/.test(line);
}

/**
 * Checks if the given line is the end of a JsDoc comment.
 */
function isJsDocEnd(line : string) : boolean {
	return /^\s*\*\/\s*/.test(line);
}

/**
 * Extracts the JsDoc section from the file, given the start index
 * where the comment starts.
 */
function extractJsDoc(lines : Array<string>, startIndex : number) : JsDocTextSection {
	var endIndex : number = startIndex + 1,
		content : string;
	
	while (!isJsDocEnd(lines[endIndex])) {
		endIndex++;
	}
	
	content = lines.slice(startIndex, endIndex + 1).join("\n") + "\n";
	
	return {
		startingLine: startIndex,
		endingLine: endIndex,
		content: content
	}
}

/**
 * Find out all the modules where the item is exported via the @inmodule
 * jsdoc annotation.
 */
function readExportedModules(jsDoc : string) : Array<string>{
	var jsDocDescription : IDescription = doctrine.parse(doctrine.unwrapComment(jsDoc.trim())),
		result = []; 

	if (jsDocDescription && jsDocDescription.tags) {
		for (var i = 0; i < jsDocDescription.tags.length; i++) {
			var tag = jsDocDescription.tags[i];
			
			if (tag.title == "inmodule") {
				result.push(tag.description);
			}
		}
	}

	return result;
}
