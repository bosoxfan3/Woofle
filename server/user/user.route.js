'use strict';

var express = require('express');
const expressJwt = require('express-jwt');
var router = express.Router();
var path = require('path');

const breedController = require('../breed/breed.controller');
const config = require('../../config');

router.route('/viewFavorites')
  .get(function(req, res, next) {
    res.sendFile(path.resolve('public/favorites.html'));
  });
//Is this necessary anymore? We use favorites.route to go to favorites page

module.exports = router;
