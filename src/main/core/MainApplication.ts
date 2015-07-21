/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../typings/nomnom/nomnom.d.ts"/>
/// <reference path="../../../typings/colors/colors.d.ts"/>

import fs = require("fs");
import nomnom = require("nomnom");
import colors = require("colors/safe");
import MultipleFileParser = require("./MultipleFileParser");

var args = nomnom.option("out", {
	abbr: "o",
	flag: false,
}).parse();


if (args._.length == 0) {
	console.error(colors.red("No .d.ts files to process."));
	process.exit(1);
}

var resultContent = MultipleFileParser.parseFiles(args._);

// write the result content file.
if (args.out) {
	fs.writeFileSync(args.out, resultContent, {encoding: 'utf-8'});
} else {
	console.log(resultContent);
}
