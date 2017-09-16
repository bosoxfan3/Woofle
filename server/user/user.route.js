var express = require('express');
const expressJwt = require('express-jwt');
var router = express.Router();
var path = require('path');

const userController = require('./user.controller');
const config = require('../../config');

/**
 * Allow users to add favorite breed
 */
router.route('/favorites/:breedName')
  .post(expressJwt({ secret: config.JWT_SECRET_KEY }), userController.addFavoriteBreed);

module.exports = router;