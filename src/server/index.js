// SERVER index.js
import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
//import path from 'path';
import config from '../config';
import routes from './routes';
import errorHandler from './helpers/error-handler.helper';


const router = express.Router();
const server = () => {
  const app = express();
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }));
  app.use(cookieParser(config.cookieSecret));
  config.env == 'development'? app.use(morgan('dev')) : app.use(morgan('combined'));
  app.use(routes(router));
  app.use(errorHandler);
  return app;
}

export default server;
