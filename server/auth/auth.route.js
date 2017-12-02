'use strict';

const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');

router.route('/signup')
  .post(authController.signup);
  
router.route('/login')
  .post(authController.login);


// TODO
router.route('/logout')
  .post(authController.logout) //don't use but just in case since there's no universal standard
  .get(authController.logout);

module.exports = router;
