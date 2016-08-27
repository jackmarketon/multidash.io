'use strict';
let blessed = require('blessed');

module.exports = {
  initBlessed,
};

function initBlessed(opts) {
  const screen = blessed.screen({
    smartCSR: true,
  });

  screen.title = `${process.cwd}`;

  const box = blessed.box({
    top: 'center',
    left: 'center',
    .
  })
}

