import jwt from 'jsonwebtoken';

import User from '../models/user.model';
import config from '../../config';

const signin = (req, res, next) => {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) {
      err.httpStatusCode = 500;
      return next(err);
    }
    if (!user) {
      const err = new Error('User not found');
      err.httpStatusCode = 401;
      return next(err);
    }
    try {
      const _user = await user.authenticate(req.body.password);
      if (!_user.isAuthenticated) {
        const err = new Error('User and password don\'t match');
        err.httpStatusCode = 401;
        next(err);
      }
      if (!_user.isActive) {
        const err = new Error('Inactive user. Contact an administrator.');
        err.httpStatusCode = 401;
        next(err);
      }
      const tokenExpiresIn = Math.floor((Date.now() + config.sessionExpireTime) / 1000); // this is seconds
      const token = jwt.sign({ _id: user._id, exp: tokenExpiresIn }, config.jwtSecret);
      res.cookie(config.cookieName, token, {maxAge: config.sessionExpireTime});
      return res.status(200).json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          services: user.services,
        }
      });
    }
    catch (e) {
      e.httpStatusCode = 500;
      next(e);
    }
  });
}

const signout = (req, res, next) => {
  res.clearCookie(config.cookieName);
  return res.status(200).json({
    message: 'Signed out'
  });
}

export default { signin, signout }
