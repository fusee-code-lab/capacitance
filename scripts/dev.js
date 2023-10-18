const rollup = require('rollup');
const { spawn } = require('child_process');
const electron = require('electron');

process.env['mainMode'] = 'development';
process.env['rendererMode'] = 'development';

let electronProcess = null;
let manualRestart = false;

async function startMain() {
  return new Promise((resolve, reject) => {
    const watcher = rollup.watch([require('./config/main'), require('./config/preload')]);
    watcher.on('event', (event) => {
      if (event.code === 'END') {
        if (electronProcess && electronProcess.kill) {
          manualRestart = true;
          process.kill(electronProcess.pid);
          electronProcess = null;
          startElectron();
          setTimeout(() => {
            manualRestart = false;
          }, 5000);
        }
        resolve(1);
      } else if (event.code === 'ERROR') {
        reject(event.error);
      }
    });
  });
}

function startElectron() {
  let args = ['app/dist/main/index.js'];
  if (process.env.npm_execpath.endsWith('yarn.js')) {
    args = args.concat(process.argv.slice(3));
  } else if (process.env.npm_execpath.endsWith('npm-cli.js')) {
    args = args.concat(process.argv.slice(2));
  }
  electronProcess = spawn(electron, args);
  electronProcess.stdout.on('data', (data) => {
    const msg = data.toString().trim();
    msg &&
      console.log(
        `\x1b[34m[main stdout ${new Date().toLocaleTimeString()}]\x1b[0m: \x1b[1m${msg}\x1b[0m`
      );
  });
  electronProcess.stderr.on('data', (data) => {
    const msg = data.toString().trim();
    msg &&
      console.log(
        `\x1b[31m[main stderr ${new Date().toLocaleTimeString()}]\x1b[0m: \x1b[1;31m${msg}\x1b[0m`
      );
  });
  electronProcess.on('exit', (e) => {
    console.log('[main exit]');
  });
  electronProcess.on('close', () => {
    if (!manualRestart) process.exit();
  });
}

async function init() {
  await startMain();
  startElectron();
}

init().then();
