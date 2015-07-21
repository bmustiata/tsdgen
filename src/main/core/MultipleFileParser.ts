/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../typings/colors/colors.d.ts"/>

import parser = require("./DefinitionParser");
import fs = require("fs");
import colors = require("colors/safe");

/**
 * Reads and parses all the given files, and outputs the full definition
 * content, with all the module declarations that were found from the parsed
 * files.
 */
export function parseFiles(fileNames : Array<string>) : string {
	var resultContent = "";
	
	// parse all the given files
	fileNames.forEach((definitionFile) => {
		console.error("Processing " + colors.cyan(definitionFile));
		
		var content : string = fs.readFileSync(definitionFile, {
			encoding : "utf-8"
		});
		
		var definitions = new parser.DefinitionParser().parseDefinitions(content);
		
		var modules = {};
		
		for (var i = 0; i < definitions.length; i++) {
			var def = definitions[i];
			
			for (var j = 0; j < def.modules.length; j++) {
				var moduleName = def.modules[i];
				
				var contentList : Array<string> = modules[moduleName];
				
				if (!contentList) {
					modules[moduleName] = contentList = [];
				}
				
				contentList.push( def.item ); 
			}
		}
		
		for (var k in modules) {
			resultContent += 'declare module ' + k + '{\n';
			
			for (var i = 0; i < modules[k].length; i++) {
				resultContent += modules[k][i] + '\n';
			}
			
			resultContent += '}\n';
		}
	});
		
		
	return resultContent;
}
