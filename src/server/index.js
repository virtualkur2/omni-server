// SERVER index.js
import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
//import path from 'path';
import config from '../config';
import routes from './routes';

const router = express.Router();
cookieParser(config.cookieSecret);
const server = () => {
  const app = express();
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(routes(router));
  return app;
}

export default server;
