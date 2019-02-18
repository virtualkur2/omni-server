// AUTH Route index.js
import authCtrl from '../../controllers/auth.controller';

const auth = (router) => {
  router.route('/auth/signin')
    .post(authCtrl.signin);

  router.route('/auth/signout')
    .post(authCtrl.signout);

  // TODO: Add * for any other request
}

export default auth;
