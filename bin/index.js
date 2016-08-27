#!/usr/bin/env node --harmony
'use strict';

// Module Dependencies
const program = require('commander');
const debug = require('debug')('bin');
const pjson = require('./../package.json');
const blessedEngine = require('./../lib/blessedEngine');
const path = require('path');

let config = {};

program
  .version(pjson.version) // read from package.json
  .usage('[options] <file ...>')
  .option(
    '-c, --config [path]',
    'Config file, no default expects json file',
    (val) => val,
    'multidash.config.js'
  )
  .option(
    '-m, --mode [value]',
    'Mode to run multidash in',
    (val) => val,
    'dev'
  )
  .parse(process.argv);

debug(`
- Config (file path): ${program.config}
`);

config = require(path.resolve(process.cwd(), program.config));
debug(`
- Config (parsed): ${config}
`);

blessedEngine(config, process.mode);
