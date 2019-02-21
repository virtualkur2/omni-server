import auth from './auth/';
import users from './users';

const routes = (router) => {
  auth(router);
  return router;
}

export default routes;
