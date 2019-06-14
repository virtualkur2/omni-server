// AUTH Route index.js
import authCtrl from '../../controllers/auth.controller';

const auth = (router) => {
  router.route('/api/auth/signin')
    .post(authCtrl.signin);

  router.route('/api/auth/signout')
    .post(authCtrl.signout);
}

export default auth;
