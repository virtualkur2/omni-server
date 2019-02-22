import consoleStamp from 'console-stamp';
import * as Domain from 'domain';

import config from './config';
import server from './server/';
import dbHelper from './server/helpers/db-connection.helper';

const d = Domain.create();

d.run(() => {
  const app = server();
  console.info('Starting app...');
  dbHelper.connect()
    .then(() => {
      console.info('===> Starting server...');
      app.listen(config.port, (err) => {
        if(err) {
          console.error(err.message);
          process.exit(1);
        }
        console.info(`===> Server succesfully started and listening on port ${config.port}.`);
      });
    })
    .catch((err) => {
      console.error('Error: ', err);
      process.exit(1);
    });
});

d.on('error', (err) => {
  // TODO: Call error handler function for domain
  console.error('Error in app. Cause: ', err.message);
  console.error('A restart is needed.');
  process.exit(1);
});

process.on('beforeExit', () => {
  console.log('Preparing for close app...');
  dbHelper.disconnect()
    .then(() => {
      console.info('...');
    })
    .catch((err) => {
      console.error('Error: ', err);
    });
});

process.on('exit', (exitCode) => {
  console.info('===> A process.exit() was called with code ', exitCode);
  console.info('...closing app.')
  console.info('Bye');

});

process.on('SIGINT', () => {
  console.info('\n===> <ctrl+c> detected');
  dbHelper.disconnect()
    .then(() => {
      console.info('...');
    })
    .catch((err) => {
      console.error('Error: ', err);
    });
  process.exit(1);
});
