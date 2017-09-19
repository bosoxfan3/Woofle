var express = require('express');
const expressJwt = require('express-jwt');
var router = express.Router();
var path = require('path');

const favoritesController = require('./favorites.controller');
const config = require('../../config');

router.route('/all')
  .get(favoritesController.all);

router.route('/:breedName')
  .post(favoritesController.addFavorite)
  .delete(favoritesController.deleteFavorite);

router.route('/')
  .get(favoritesController.newFunction);

module.exports = router;
