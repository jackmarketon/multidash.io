'use strict';

// Module Dependencies
let blessed = require('blessed');
let debug = require('debug')('blessedEngine');
let spawn = require('child_process').spawn;
let SocketIO = require('socket.io');

module.exports = initBlessed;

function initBlessed(opts) {
  const childProcs = [];
  const screen = blessed.screen({
    smartCSR: true,
  });

  screen.title = `${process.cwd}`;

  opts.process.forEach((proc, idx) => {
    const box = blessed.box({
      left: (idx === 0) ? '0' : '50%',
      top: '0',
      width: '50%',
      height: '60%',
      border: {
        type: 'line',
      },
      style: {
        fg: 'green',
        bg: (idx === 0) ? 'black' : 'white',
        border: {
          fg: 'magenta'
        },
        hover: {
          bg: 'gray'
        }
      }
    });

    const log = blessed.log({
      parent: box,
      scrollable: true,
      input: true,
      alwaysScroll: true,
      scrollBar: {
        ch: " ",
        inverse: true,
      },
      keys: true,
      vi: true,
      mouse: true,
      tags: true
    });

    const split = proc.split(' ');
    const cmd = split[0];
    const args = split.slice(1);
    console.log(cmd);
    console.log(args);
    const child = spawn(cmd, args, {
      env: process.env,
      stdio: [null, null, null, null],
      detached: true
    });

    childProcs.push(child.pid);

    const server = SocketIO((9800+idx));
    server.on('connection', (socket) => {
      sockect.on('message', (message) => {
        log.log(message);
      });
    });

    server.on('error', (err) => console.log(err));

    child.stdout.on('data', (data) => log.log(data.toString('utf8')));

    child.stderr.on('data', (data) => log.log(data.toString('utf8')));

    screen.append(box);
  });

  screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

  screen.render();

  // process.on('exit', () => childProcs.forEach((proc) => process.kill(-proc)));
}
