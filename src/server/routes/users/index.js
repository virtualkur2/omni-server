// ROUTES: USERS index.js
import authCtrl from '../../controllers/auth.controller';
import usrCtrl from '../../controllers/user.controller';

const users = (router) => {
  router.route('/api/user/signup')
    .post(usrCtrl.create);

  router.route('/api/user/id/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, usrCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, usrCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, usrCtrl.remove);

  router.route('/api/user/email/:userEmail')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, usrCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, usrCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, usrCtrl.remove);


  router.param('userId', usrCtrl.userById);

  router.param('userEmail', usrCtrl.userByEmail);

  return router;
}

export default users;
