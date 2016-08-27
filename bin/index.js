#!/usr/bin/env node --harmony
'use strict';

// Module Dependencies
const program = require('commander');
const pjson = require('./../package.json');
const debug = require('debug')('bin');
const configParser = require('./../lib/configParser');

let config = {};

program
  .version(pjson.version) // read from package.json
  .usage('[options] <file ...>')
  .option(
    '-c, --config [path]',
    'Config file, no default expects json file',
    (val) => val,
    false
  )
  .option(
    '-p, --process [value]',
    'Commands to spawn (curr limit is 2',
    (curr, acc) => acc.concat(curr),
    []
  )
  // This will change to true once @TODO for useable terminals is implimented
  .option('-t, --terminal', 'Spawn a usable terminal')
  .parse(process.argv);

program.process = program.process;
program.debug = program.debug || 0;
program.terminal = true === program.terminal;

debug(`
- Config (file path): ${program.config}
- Processes (bash): "${program.process.join('" && "')}"
- Terminal (boolean): ${program.terminal}
`);

// if no config or less than two proc commands die
if (!program.config && 0 === program.process.length) {
  throw new Error('Need a config file [-c] OR processes to run [-p]');
} else if (!program.config && 2 > program.process.length) {
  throw new Error('Need two or more processes to run.');
}

config = program.opts();

// @TODO this isn't working atm as I hate dealing with async file reads
// if (program.config) {
//   debug(`Using config file: ${program.config}`);
//   const parsed = configParser(program.config);
//   config = Object.assign(parsed, config);
// }

// Run blessed