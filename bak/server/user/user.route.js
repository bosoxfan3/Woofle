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

module.exports = router;
