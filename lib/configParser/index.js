// @TODO get this stupid thing working
'use strict';
// Module Dependencies
const fs = require('fs');
const debug = require('debug')('configParser');
const path = require('path');

module.exports = configParser;

/**
 * Parse the config file after seeing if we can access it.
 * @param  {string} configPath [file path for config]
 * @return {obj}            config object
 */
function configParser(configPath) {
  const config = path.resolve(process.cwd(), configPath);
  debug(`Config fullpath: ${config}`);
  fs.access(config, fs.F_OK, (err) => {
    if (err) {
      throw new Error(`Problem accessing ${config}\n${err}`);
    }
    console.log('hit');
    const file = fs.readFileSync(config);
    let ret;
    debug('hit');
    try {
      debug(file);
      ret = JSON.parse(file);
      debug(ret);
      return ret;
    } catch (e) {
      throw new Error(`Issue reading config, is it valid JSON?\n${e}`);
    }
  });
}
