'use strict';

const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../user/user.model');
const path = require('path');

function showSignupForm(req, res, next) {
  //res.sendFile(path.join(__dirname, '../../public', 'signup.html'));
  res.sendFile(path.resolve('public/signup.html'));
}
// Unncessary because of use html middleware function in server.js. When it goes
//to the route ending in /signup, it looks for an html file with the name signup
//and automatically loads that
//If you do want to use again, make sure to export this function

function signup(req, res, next) {
  const requiredFields = ['email', 'password'];
  //taken from the names of the inputs
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  User
    .create({
      //create is usable even though it isn't a defined function in user.model
      //because .create is a mongoose method. You export the userSchema as a 
      //mongoose based model at the bottom of user.model.js
      email: req.body.email,
      password: req.body.password
    })
    //How can I send a message here so they know their stuff
    //got created?
    //1. Potentially create a new html file and new route that you can redirect to
    .then(user => res.redirect('/auth/login'))
    .catch(err => {
      if (err.code === 11000) {
        // Duplicate key error, already exists
        console.log('That email is already registered');
        //How can I send this back to the user so they know
        //what is going on?
        res.redirect('/auth/login');
        return;
      }
      console.error('Error creating user: ' + err);
      res.status(500).json({message: 'Internal server error'});
    });
}

function showLoginForm(req, res, next) {
  //res.sendFile(path.join(__dirname, '../../public', 'login.html'));
  res.sendFile(path.resolve('public/login.html'));
}

function login(req, res, next) {
  const { email, password } = req.body;
  User.get(email, password)
  //can't say that this part makes perfect sense
    .then((user) => {
      const token = jwt.sign({
        email: user.email,
        id: user.id
      }, config.JWT_SECRET_KEY);
      // Set a cookie for our auth token.
      res.cookie('woofle-token', token);
      res.redirect('/search');
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
}


function logout(req, res, next) {
  req.user = null;
  res.clearCookie('woofle-token');
  res.redirect('/auth/login');
  //Sets the user to blank, clears the cookie, and resends you to the login page
}

module.exports = {  showSignupForm, signup, showLoginForm, login, logout };
