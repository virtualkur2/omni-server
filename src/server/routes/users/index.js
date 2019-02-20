// ROUTES: USERS index.js
import authCrl from '../../controllers/auth.controller';
import usrCtrl from '../../controllers/user.controller';

const users = (router) => {
  router.route('/api/users/signup')
    .post(usrCtrl.create);

  router.route('/api/users/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, usrCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, usrCtrl.update)
    .delete(auhtCtrl.requireSignin, authCrl.hasAuthorization, usrCtrl.remove);

  router.param('userId', usrCtrl.userById);

  return router;
}

export default users;
