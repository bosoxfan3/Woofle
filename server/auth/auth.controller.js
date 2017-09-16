const jwt = require('jsonwebtoken')
const config = require('../../config')
const User = require('../user/user.model')

function signup(req, res, next) {
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
        user: user
      }))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  User.get(email, password)
    .then((user) => {
      const token = jwt.sign({
        email: user.email
      }, config.JWT_SECRET_KEY)
      return res.json({
        email,
        token
      })
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
}

module.exports = { signup, login }