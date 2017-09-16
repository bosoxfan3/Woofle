var express = require('express');
var router = express.Router();
var path = require('path');

const authController = require('./auth.controller');

/**
 * Alow users to signup
 */
router.route('/signup')
  .post(authController.signup);

/**
 * Allow users to login
 */
router.route('/login')
  .post(authController.login);

module.exports = router;