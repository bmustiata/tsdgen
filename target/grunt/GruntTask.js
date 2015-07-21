var fs = require("fs");
var path = require("path");
var MultipleFileParser = require("../core/MultipleFileParser");
var colors = require("colors/safe");
/**
 * The actual grunt task that will do the file parsing using the code transformer.
 */
module.exports = function (grunt) {
    grunt.registerMultiTask("tsdgen", "Generate typescript global module definition from local definitions.", function () {
        var files = this.files.filter(function (file) { return fs.statSync(file.src[0]).isFile(); })
            .map(function (file) { return file.src[0]; });
        var result = MultipleFileParser.parseFiles(files);
        var fileName = this.files[0].dest;
        fs.writeFileSync(fileName, result, { encoding: "utf-8" });
        console.log("Wrote " + colors.cyan(path.resolve(fileName)));
    });
};
//# sourceMappingURL=GruntTask.js.map