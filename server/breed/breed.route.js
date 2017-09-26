'use strict';

var express = require('express');
const expressJwt = require('express-jwt');
var router = express.Router();

const breedController = require('./breed.controller');
const config = require('../../config');

router.route('/:breedName')
  .get(breedController.showBreedPage);

router.route('/search/:breedName')
  .get(breedController.saveInputFromBreedSearch);

router.route('/fetch/:breedName')
  .get(breedController.fetchBreedData);

module.exports = router;
