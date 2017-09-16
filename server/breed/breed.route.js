var express = require('express');
const expressJwt = require('express-jwt');
var router = express.Router();
var path = require('path');

const breedController = require('./breed.controller');
const config = require('../../config');

/**
 * Allow users to add favorite breed
 */
router.route('/fetch/:breedName')
  .get(expressJwt({ secret: config.JWT_SECRET_KEY }), breedController.fetchBreedData);

module.exports = router;