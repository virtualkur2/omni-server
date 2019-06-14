import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import config from '../../config';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Field \'name\' is required.'
  },
  lastname: {
    type: String,
    trim: true,
    required: 'Field \'lastname\' is required.'
  },
  email: {
    type: String,
    trim: true,
    unique: 'This email already exists.',
    match: [/.+\@.+\..+/,'Please fill a valid email address'],
    required: 'Field \'email\' is required',
    index: true
  },
  hashed_password: {
    type: String,
    required: 'Field \'password\' is required',
    minlength: [config.passLength, `Password must have at least ${config.passLength} characters.`]
  },
  pepper: {
    value: {
      type: String,
    },
    pre: { // For later implement: randomly attach pepper in front or end of plain password
      type: Boolean,
      default: true
    }
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  },
  services: {
    type: Array,
    default: []
  },
  active: {
    type: Boolean,
    default: false
  }
});

// The password string provided by the user is not stored directly in the user
// document. Instead, it is handled as a virtual field.
// Everytime the field 'password' is found in the body's profile, it will be set here.
// So, if an user change his/her password later (or send the same password again),
// it will be stored here and the field 'hashed_password' is going to be modified.
UserSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.pepper.value = this.makePepper();
    if(Math.round(Math.random())) {
      this.pepper.pre = true;
    } else {
      this.pepper.pre = false;
    }
    this.hashed_password = 'Modified: Please hash before save it';
  })
  .get(function() {
    return this._password;
  });

UserSchema.methods = {
  makePepper: function() {
    let pepper = '';
    for (let i = 0; i < config.saltLength ; i++) {
      let randomIndex = Math.round(Math.random() * (config.charArray.length - 1));
      pepper += config.charArray[randomIndex];
    }
    return pepper;
  },
  authenticate: async function(password) {
    try {
      let password_attempt = '';
      if (this.pepper.pre) {
        password_attempt = this.pepper.value + password;
      } else {
        password_attempt = password + this.pepper.value;
      }
      const isAuthenticated = await bcrypt.compare(password_attempt, this.hashed_password);
      const isActive = this.active;
      return {isAuthenticated: isAuthenticated, isActive: isActive}
    }
    catch (err) {
      throw err;
    }
  },
  encryptPassword: async function(password) {
    if (!password) {
      return '';
    }
    try {
      const pepper = this.pepper.value;
      const pass = this.pepper.pre ? pepper + password : password + pepper;
      const hashedPassword = await bcrypt.hash(pass, config.saltingRounds);
      return hashedPassword;
    }
    catch(err) {
      throw err;
    }
  }
}

// Validation for the password field
UserSchema.path('hashed_password').validate(function(v)	{
	if	(this._password	&&	this._password.length	<	config.passLength) {
    this.invalidate('password',	`Password must have at least ${config.passLength} characters`);
	}
}, null);

// Create hashed password and store it in the user profile before
// validation, so the validation could do it's job correctly.
// Since encryptPassword() is an async function it will be handled
// with async / await.
UserSchema.pre('validate', async function(next) {
  const user = this;
  if (!user.isNew && !user.isModified('hashed_password')) { // check if neccessary to rehash the password
    next();
  } else {
    const password = user.password;
    try {
      user.hashed_password = await user.encryptPassword(password);
      next();
      }
    catch(err) {
      console.log(`Error hashing password for user: ${user.email}`);
      err.httpStatusCode = 500;
      next(err);
      }
    }
  });

export default mongoose.model('User', UserSchema);
