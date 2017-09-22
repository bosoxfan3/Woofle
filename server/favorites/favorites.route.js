'use strict';

const express = require('express');
const expressJwt = require('express-jwt');
const router = express.Router();

const favoritesController = require('./favorites.controller');
const config = require('../../config');

router.route('/all')
  .get(favoritesController.all);

router.route('/:breedName')
  .post(favoritesController.addFavorite)
  .delete(favoritesController.deleteFavorite);

router.route('/')
  .get(favoritesController.showFavorites);

module.exports = router;
