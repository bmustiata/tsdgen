/// <reference path="../typings/node/doctrine.d.ts" />
/**
 * Parses the definitions from the given .d.ts file content,
 * returning an array of items that have the @inmodule
 * JsDoc annotation.
 */
export declare class DefinitionParser {
    parseDefinitions(content: string): Array<ExportedItem>;
}
