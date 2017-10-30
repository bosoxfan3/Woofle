'use strict';

const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');

router.route('/signup')
  .get(authController.showSignupForm)
  .post(authController.signup);
  
router.route('/login')
  .get(authController.showLoginForm)
  .post(authController.login);

router.route('/logout')
  .post(authController.logout) //don't use but just in case since there's no universal standard
  .get(authController.logout);

module.exports = router;
