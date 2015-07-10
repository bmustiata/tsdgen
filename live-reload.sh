#!/usr/bin/env bash

fast-live-reload -o\
    -ep "bash -c 'tsc -w src/main/core/*.ts --outDir lib/ -d --module commonjs'"\
    /tmp/tstest/target/ lib/ -e "bash -c 'node lib/MainApplication.js lib/*.d.ts /tmp/tstest/target/*.d.ts'"
