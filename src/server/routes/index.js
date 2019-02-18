import auth from './auth/';

const routes = (router) => {
  auth(router);
  return router;
}

export default routes;
