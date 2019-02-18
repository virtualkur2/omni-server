// SERVER index.js
import express from 'express';
import helmet from 'helmet';
import path from 'path';

//import routes from './routes';

const router = express.Router();

const server = () => {
  const app = express();
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }));
  //app.use(routes(router));
  return app;
}

export default server;
