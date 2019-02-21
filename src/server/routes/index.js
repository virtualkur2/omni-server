import auth from './auth/';
import users from './users';

const routes = (router) => {
  auth(router);
  users(router);
  return router;
}

export default routes;
