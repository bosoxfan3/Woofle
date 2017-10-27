'use strict';

var express = require('express');
const expressJwt = require('express-jwt');
var router = express.Router();

const breedController = require('./breed.controller');
const config = require('../../config');

router.route('/all')
  .get(breedController.loadSearchBar);
//In Express, order matters. Previously had this as the last router.get and
//it did not work because with (/:breedName) listed first it just assumed
//(/all) was a substitute for breedName

router.route('/:breedName')
  .get(breedController.showBreedPage);

router.route('/search/:breedName')
  .get(breedController.saveInputFromBreedSearch);

router.route('/fetch/:breedName')
  .get(breedController.fetchBreedData);



module.exports = router;
