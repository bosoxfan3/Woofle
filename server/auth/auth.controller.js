'use strict';

exports.getSignupPage = getSignupPage;
exports.getLoginPage = getLoginPage;
exports.signup = signup;
exports.login = login;
exports.logout = logout;

const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../user/user.model');
const path = require('path');

function getSignupPage(req, res, next) {
  res.sendFile(path.resolve('public/auth/signup.html'));
}

function getLoginPage(req, res, next) {
  res.sendFile(path.resolve('public/auth/login.html'));
}

function signup(req, res, next) {
  const { email, password } = req.body;
  const requiredFields = ['email', 'password'];
  //taken from the names of the inputs
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      return res.status(400).send(`Missing \`${field}\` in request body`);
    }
  }
  User.findOne({email})
    .then(function(result) {
      if (result !== null) {
        return res.status(400).send(`${email} already in database`);
      }
      User.create({email, password})
      //create is usable even though it isn't a defined function in user.model
      //because .create is a mongoose method.
        .then(user => res.json({url:'/auth/login.html'}))
        .catch(err => next(err));
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).send();
  }
  User.findOne({email, password})
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).send();
      }
      if (password !== user.password) {
        return res.status(401).send();
      }
      const token = jwt.sign({
        email: user.email,
        id: user.id,
      }, config.JWT_SECRET_KEY);
      // Set a cookie for our auth token.
      res.cookie('woofle-token', token, {maxAge: 9999999});
      res.status(200).send({redirect: '/search'});
    })
    .catch(err => {
      res.status(500).json({message: 'Internal server error'});
    });
}

function logout(req, res, next) {
  req.user = null;
  res.clearCookie('woofle-token');
  res.redirect('/');
}