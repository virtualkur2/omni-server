//HELPERS index.js
import errorHandler from './error-handler.helper';
import dbConnection from './db-connection.helper';

const helper = () => {
  const errorHelper = errorHandler;
  const dbHelper = dbConnection;
}

export default helper;
