import { Worker } from 'worker_threads';
import debug from 'debug';

// ? TODO remove ?

const log = debug('app:init');
let worker: Worker;

/**
 * Enable auto schedule fulfilling.
 */
const enable = () => {
  worker = new Worker('./schedule-manager.js');
  worker.postMessage('enable');

  worker.on('message', (value) => {
    log('Enable worker %p', value);
  });

  worker.on('error', (err) => {
    log('Worker error %O', err);
  });
};

const disable = () => {
  worker.postMessage('disable');
};

export { enable, disable };
