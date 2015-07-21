/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../typings/nomnom/nomnom.d.ts"/>
/// <reference path="../../../typings/colors/colors.d.ts"/>
var fs = require("fs");
var nomnom = require("nomnom");
var colors = require("colors/safe");
var MultipleFileParser = require("./MultipleFileParser");
var args = nomnom.option("out", {
    abbr: "o",
    flag: false
}).parse();
if (args._.length == 0) {
    console.error(colors.red("No .d.ts files to process."));
    process.exit(1);
}
var resultContent = MultipleFileParser.parseFiles(args._);
// write the result content file.
if (args.out) {
    fs.writeFileSync(args.out, resultContent, { encoding: 'utf-8' });
}
else {
    console.log(resultContent);
}
//# sourceMappingURL=MainApplication.js.map