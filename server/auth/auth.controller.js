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

function getSignupPage(req, res) {
  res.sendFile(path.resolve('public/auth/signup.html'));
}

function getLoginPage(req, res) {
  res.sendFile(path.resolve('public/auth/login.html'));
}

function signup(req, res, next) {
  const {email, password} = req.body;
  const requiredFields = ['email', 'password'];
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
        .then(user => res.json({url:'/auth/login.html'}))
        .catch(err => next(err));
    });
}

function login(req, res) {
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
      res.cookie('woofle-token', token, {maxAge: 9999999});
      res.status(200).send({redirect: '/search'});
    })
    .catch(err => {
      res.status(500).json({message: 'Internal server error'});
    });
}

function logout(req, res) {
  req.user = null;
  res.clearCookie('woofle-token');
  res.redirect('/');
}