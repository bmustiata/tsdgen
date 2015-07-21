import fs = require("fs");
import path = require("path");
import MultipleFileParser = require("../core/MultipleFileParser");
import colors = require("colors/safe");

interface Grunt {
	registerMultiTask(name: string, description: string, callback: Function);
}

/**
 * The actual grunt task that will do the file parsing using the code transformer.
 */
module.exports = function(grunt : Grunt) {
	grunt.registerMultiTask("tsdgen", "Generate typescript global module definition from local definitions.", function() {
		var files = this.files.filter(file => fs.statSync(file.src[0]).isFile())
			.map(file => file.src[0]);
			
		var result = MultipleFileParser.parseFiles(files);
		
		var fileName = this.files[0].dest;
		fs.writeFileSync(fileName, result, {encoding: "utf-8"});
		
		console.log("Wrote " + colors.cyan(path.resolve(fileName)));
	});
}
