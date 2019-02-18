import mongoose from 'mongoose';
import config from '../../config';

const db = mongoose.connection;
const uri = config.mongoUri;
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  ssl: config.env !== 'development' ? true: false,
  connectTimeoutMS: 15000,
  reconnectInterval: 800,
  reconnectTries: 5,
  poolSize: 15,
}

const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(uri, options)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      console.error('Error: ', err);
      reject(err);
    });
  });
}

const disconnect = () => {
  return new Promise((resolve, reject) => {
    db.close()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.error('Error: ', err);
        reject(err);
      });

  });
}

db.on('connecting', () => {
  console.info('===> Trying to connect to database...');
});

db.on('connected', () => {
  console.info('===> Succesfully connected to database.');
});

db.on('disconnecting', () => {
  console.info('===> Disconnecting from database...');
});

db.on('disconnected', () => {
  console.info('===> Database connection lost.');
});

db.on('close', () => {
  console.info('===> Database connection closed succesfully.');
});

db.on('fullsetup', () => {
  console.info('===> Replica set: Succesfully connected to Primary and at least one Secondary');
});

db.on('all', () => {
  console.info('===> Replica set: Succesfully connected to All servers of the set.');
});

db.on('error', (err) => {
  console.error(`===> Error connecting to database: ${err}`);
});

export default { connect, disconnect };
