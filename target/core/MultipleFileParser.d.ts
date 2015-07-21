/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/colors/colors.d.ts" />
/**
 * Reads and parses all the given files, and outputs the full definition
 * content, with all the module declarations that were found from the parsed
 * files.
 */
export declare function parseFiles(fileNames: Array<string>): string;
