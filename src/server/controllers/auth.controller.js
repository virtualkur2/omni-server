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
      res.cookie(config.cookieName, token, config.cookieOptions);
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

const requireSignin = (req, res, next) => {
  const token = getToken(req);
  if(!token) {
    const error = new Error('Missing credentials, please login.');
    error.httpStatusCode = 401;
    next(error);
  }
  const tokenMaxAge = config.sessionExpireTime / 1000; // this is seconds
  jwt.verify(token, config.jwtSecret, {maxAge: tokenMaxAge}, (err, decoded) => {
    if (err) {
      err.httpStatusCode = 500;
      next(err);
    }
    req.auth = decoded;
    next();
  });
}

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && (req.profile._id == req.auth._id);
  if (!authorized) {
    const error = new Error('User not authorized');
    error.httpStatusCode = 401;
    next(error);
  }
  next();
}


// implements 3 ways of extracting token: by 'bearer' header, by req.query and by cookie token.
const getToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  // the next line will be implemented later
  // } else if (req.signedCookies && res.signedCookies[config.cookieName]) {
  //   return res.signedCookies[config.cookieName].token;
  } else {
    console.log('signedCookies: ', req.signedCookies);
    return null;
  }
}

export default { signin, signout, requireSignin, hasAuthorization }
