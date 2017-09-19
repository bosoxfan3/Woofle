'use strict';

const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');

/**
 * Allow users to signup
 */
router.route('/signup')
  .post(authController.signup)
  .get(authController.showSignupForm);

/**
 * Allow users to login
 */
router.route('/login')
  .post(authController.login)
  .get(authController.showLoginForm);

/**
 * Allow users to logout
 */
router.route('/logout')
  .get(authController.logout);

module.exports = router;
