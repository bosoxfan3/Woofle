'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  // email: String,
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  favorites: [String],
});

userSchema.statics = {
  /**
   * Get user with given email and password
   */
  get (email, password) {
    return this.findOne({
      email,
      password
    })
      .exec()
      .then((user) => {
        if (user) {
          return Promise.resolve(user);
          // return user;
        }
        const err = new Error('user credentials does not match');
        return Promise.reject(err);
      })
      .catch((err) => {
        console.log(err, 'there was an error');
      });
  },
  //Don't know that I ever use these functions

  /**
   * Get user by email
   */
  getByEmail(email) {
    return this.findOne({
      email
    })
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new Error('user does not exist');
        return Promise.reject(err);
      });
  },

  /**
   * Get user by id
   */
  getById(userId) {
    return this.findById(userId)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new Error('user does not exist');
        return Promise.reject(err);
      });
  }
};

module.exports = mongoose.model('User', userSchema);