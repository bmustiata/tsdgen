/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../typings/nomnom/nomnom.d.ts"/>
/// <reference path="../../../typings/colors/colors.d.ts"/>
var parser = require("./DefinitionParser");
var fs = require("fs");
var nomnom = require("nomnom");
var colors = require("colors/safe");
var args = nomnom.option("out", {
    abbr: "o",
    flag: false
}).parse();
var resultContent = "";
if (args._.length == 0) {
    console.error(colors.red("No .d.ts files to process."));
    process.exit(1);
}
// parse all the given files
args._.slice(2).forEach(function (definitionFile) {
    console.error("Processing " + colors.cyan(definitionFile));
    var content = fs.readFileSync(definitionFile, {
        encoding: "utf-8"
    });
    var definitions = new parser.DefinitionParser().parseDefinitions(content);
    var modules = {};
    for (var i = 0; i < definitions.length; i++) {
        var def = definitions[i];
        for (var j = 0; j < def.modules.length; j++) {
            var moduleName = def.modules[i];
            var contentList = modules[moduleName];
            if (!contentList) {
                modules[moduleName] = contentList = [];
            }
            contentList.push(def.item);
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
// write the result content file.
if (args.out) {
    fs.writeFileSync(args.out, resultContent, { encoding: 'utf-8' });
}
else {
    console.log(resultContent);
}
//# sourceMappingURL=MainApplication.js.map