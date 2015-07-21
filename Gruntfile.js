/**
 * Grunt project configuration.
 */
module.exports = function(grunt) {
    // configuration for the plugins.
    grunt.initConfig({
        clean: {
            dist : [
                "target/"
            ]
        },

        sync : {
            dist : {
                // pretend: true,
                verbose: true,
                files : [
                    { expand: true, cwd: 'src/main/bin', src: ['**'], dest: 'target/' },
                    { expand: true, cwd: 'src/main/grunt', src: ['**/*.js'], dest: 'tasks/' }
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
                    dest: "target/",
                    src: [
                        "src/main/**/*.ts",
                        "src/main/**/*.d.ts"
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
