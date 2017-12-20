'use strict';

const express = require('express');
const router = express.Router();

const favoritesController = require('./favorites.controller');

router.get('/all', favoritesController.all);

router.route('/:breedName')
  .post(favoritesController.addFavorite)
  .delete(favoritesController.deleteFavorite);

module.exports = router;