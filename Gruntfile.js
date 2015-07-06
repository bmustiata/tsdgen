/**
 * Grunt project configuration.
 */
module.exports = function(grunt) {
    // configuration for the plugins.
    grunt.initConfig({
        clean: {
            dist : [
                "lib/"
            ]
        },

        sync : {
            dist : {
                // pretend: true,
                verbose: true,
                files : [
                    { expand: true, cwd: 'src/main/bin', src: ['**'], dest: 'lib/' }
                ]
            }
        },

        typescript: {
            "dist" : {
                options: {
                    module : 'commonjs',
                    sourceMap: true,
                    declaration: true,
                },
                files: [{
                    dest: "lib/",
                    src: [
                        "src/main/core/**/*.ts",
                        "src/main/core/**/*.d.ts"
                    ]
                }]
            }
        }
    });

    // load NPM tasks:
    // grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-sync');

    // register our tasks:
    grunt.registerTask('default', ["clean:dist", "typescript:dist", "sync:dist"]);
};
