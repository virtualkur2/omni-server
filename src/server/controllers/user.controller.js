import _ from 'lodash';

import User from '../models/user.model';

const create = (req, res, next) => {
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      return next(err);
    }
    return res.status(201).json({
      message: 'Successfully signed up'
    });
  });
}

const read = (req, res, next) => {
  // hide sensitive data before send to client
  req.profile.hashed_password = undefined;
  req.profile.pepper = undefined;
  return res.status(200).json(req.profile);
}

const update = (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, req.body);
  user.updated = Date.now();
  user.save((err, result) => {
    if (err) {
      return next(err);
    }
    return res.status(201).json({
      message: 'Successfully updated'
    });
  });
}

const remove = (req, res, next) => {
  let user = req.profile;
  user.remove((err, deletedUser) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json({
      message: 'Succesfully deleted'
    });
  });
}

const userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if(err) {
      return next(err);
    }
    if(!user) {
      const err = new Error('User not found');
      err.httpStatusCode = 404;
      return next(err);
    }
    req.profile = user;
    next();
  });
}

export default { create, read, update, remove, userById }
