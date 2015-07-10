/// <reference path="ExportedItem"/>
/// <reference path="JsDocTextSection"/>
/// <reference path="../../../typings/node/doctrine.d.ts"/>
var doctrine = require("doctrine");
/**
 * Parses the definitions from the given .d.ts file content,
 * returning an array of items that have the @inmodule
 * JsDoc annotation.
 */
var DefinitionParser = (function () {
    function DefinitionParser() {
    }
    DefinitionParser.prototype.parseDefinitions = function (content) {
        var result = [];
        var lines = content.split(/[\r\n]+/);
        for (var i = 0; i < lines.length; i++) {
            if (isJsDocStart(lines[i])) {
                var jsDoc = extractJsDoc(lines, i), inModulesExported;
                inModulesExported = readExportedModules(jsDoc.content);
                if (!inModulesExported.length) {
                    i = jsDoc.endingLine;
                    continue;
                }
                var itemContent = jsDoc.content +
                    findItemContent(lines, jsDoc.endingLine + 1);
                result.push({
                    modules: inModulesExported,
                    item: itemContent
                });
            }
        }
        return result;
    };
    return DefinitionParser;
})();
exports.DefinitionParser = DefinitionParser;
/**
 * Checks if the given line is the start of a JsDoc comment.
 */
function isJsDocStart(line) {
    return /^\s*\/\*\*\s*/.test(line);
}
/**
 * Checks if the given line is the end of a JsDoc comment.
 */
function isJsDocEnd(line) {
    return /^\s*\*\/\s*/.test(line);
}
/**
 * Extracts the JsDoc section from the file, given the start index
 * where the comment starts.
 */
function extractJsDoc(lines, startIndex) {
    var endIndex = startIndex + 1, content;
    while (!isJsDocEnd(lines[endIndex])) {
        endIndex++;
    }
    content = lines.slice(startIndex, endIndex + 1).join("\n") + "\n";
    return {
        startingLine: startIndex,
        endingLine: endIndex,
        content: content
    };
}
/**
 * Find out all the modules where the item is exported via the @inmodule
 * jsdoc annotation.
 */
function readExportedModules(jsDoc) {
    var jsDocDescription = doctrine.parse(doctrine.unwrapComment(jsDoc.trim())), result = [];
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
