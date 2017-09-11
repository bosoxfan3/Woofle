var express = require('express');
var router = express.Router();
var path = require('path');

const {User} = require('../models');

/* GET users listing. */
router.post('/signup', function(req, res, next) {
  const requiredFields = ['email', 'password'];
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
      email: req.body.email,
      password: req.body.password
    })
    .then(
      user => res.status(201).json({
        url: 'search.html',
        user: req.body
      }))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

router.post('/login', function(req, res, next) {
  res.json({loggin: true});
  var loggedin = true;
  // if logged in then send to next page.
  if (loggedin) {
    res.redirect('/search');
  }
});

module.exports = router;
