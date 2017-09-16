var express = require('express');
const expressJwt = require('express-jwt');
var router = express.Router();
var path = require('path');

const userController = require('./user.controller');
const breedController = require('../breed/breed.controller');
const config = require('../../config');

/**
 * Allow users to add favorite breed
 */
router.route('/favorites/:breedName')
  .post(expressJwt({ secret: config.JWT_SECRET_KEY }), userController.addFavoriteBreed);

/**
 * Allow users to unfavorite breed
 */
router.route('/unfavorites/:breedName')
  .post(expressJwt({ secret: config.JWT_SECRET_KEY }), userController.removeFavoriteBreed);

/**
 * Fetch user profile
 */
router.route('/:userId')
  .get(expressJwt({ secret: config.JWT_SECRET_KEY }), userController.getProfile);

router.route('/getImagesAndLinks/:breedName')
  .get(expressJwt({ secret: config.JWT_SECRET_KEY }), breedController.fetchBreedData);

module.exports = router;