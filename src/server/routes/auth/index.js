// AUTH Route index.js
import authCtrl from '../../controllers/auth.controller';

const auth = (router) => {
  router.route('/api/auth/signin')
    .post(authCtrl.signin);

  router.route('/api/auth/signout')
    .post(authCtrl.signout);

  // TODO: Add * for any other request
}

export default auth;
