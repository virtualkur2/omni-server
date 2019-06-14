// SERVER index.js
import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
//import path from 'path';
import config from '../config';
import routes from './routes';
import errorHandler from './helpers/error-handler.helper';
import notFoundHandler from './helpers/notfound-404.helper';


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
  //
  // app.use('*',(req,res,next) => {
  //   console.log(req.body);
  //   next();
  // });
  app.use(routes(router));
  app.use(errorHandler);
  app.use(notFoundHandler);
  return app;
}

export default server;
