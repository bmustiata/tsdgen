# tsdgen

Parses multiple `.d.ts` definition files and outputs node ready
definitions.

## Usage

Use A JsDoc annotation that specifies in what module the interface or class is exported.

```typescript
/**
 * Class that does this and that.
 * @inmodule "best-module-of-all-times"
 */
export class BestClass {
   // ...
}
```

Compile this file (or all the files that export classes) with `-d` in tsc,
then post process the .d.ts files in order to get the final module .d.ts.

For example in [terminal-console](https://github.com/bmustiata/terminal-console/#terminal-console) the 
[TerminalConsole](https://github.com/bmustiata/terminal-console/blob/master/src/main/core/TerminalConsole.ts) class has the `@inmodule` annotation:

```typescript
/**
 * A class that allows relogging the previously written message by using the
 * ANSI up code.
 * @inmodule "terminal-console"
 */
export class TerminalConsole {
```

When processing all the generated `.d.ts` files from the lib/ file, the [terminal-console.d.ts](https://github.com/bmustiata/terminal-console/blob/master/terminal-console.d.ts) will contain only this exported class, in the right module. Multiple modules could be specified for the same class, using multiple `@inmodule` annotations.

In order to run this automatically, including the watching of `*.ts` files, [fast-live-reload](https://github.com/bmustiata/fast-live-reload#fast-live-reload) ties things together:

```
fast-live-reload -o\
    -ep "bash -c 'tsc -w src/main/core/*.ts --outDir lib/ -d --module commonjs'"\
    lib/ -e "bash -c 'tsdgen -o terminal-console.d.ts lib/*.d.ts'"
```

As available in the [live-reload.sh](https://github.com/bmustiata/terminal-console/blob/master/live-reload.sh) script.

The tsc compiler will compile the sources into the lib folder, and after the tsdgen will generate the module `.d.ts` file.

## Grunt

If you want to use tsdgen with grunt, you can just npm install it with `--save-dev`
and then edit your Gruntfile.js configuration:

```javascript
module.exports = function(grunt) {
    // configuration for the plugins.
    grunt.initConfig({
        // ...
        tsdgen : {
            "dist" : {
                files : [
                    {
                        src: [
                            "lib/core-promise.d.ts"
                        ],
                        dest: "./core-promise.d.ts"
                    }
                ]
            }
        }
    });

    // load NPM tasks:
    grunt.loadNpmTasks("tsdgen");

    // register our tasks:
    grunt.registerTask("default", ["tsdgen"]);
};

```

Multiple `.d.ts` files can be passed for input, in order to output a single
module definitions file.

## ChangeLog

v0.2.0 2015-07-21 Added a grunt task to generate definitions.
v0.1.1 2015-07-10 *Bugfix* Parse local definitions. Parse only files sent via nomnom.
