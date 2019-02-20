import _ from 'lodash';

import User from '../models/user.model';

const create = (req, res, next) => {
  const user = new User(req.body);
  user.save(userSave);
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
  user.save(userSave);
}

const remove = (req, res, next) => {
  let user = req.profile;
  user.remove((err, deletedUser) => {
    if (err) {
      err.httpStatusCode = 500;
      next(err);
    }
    return res.status(200).json({
      message: 'Succesfully deleted'
    });
  });
}

const userById = (req, res, next) => {}

const userSave = (err, result) => {
  if (err) {
    err.httpStatusCode = 500;
    next(err);
  }
  return res.status(200).json({
    message: user.updated ? 'Successfully updated.' : 'Successfully signed up'
  });
}

export default { create, read, update, remove }
