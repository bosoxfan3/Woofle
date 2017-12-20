'use strict';

const express = require('express');
const router = express.Router();

const breedController = require('./breed.controller');

router.get('/all', breedController.loadSearchBar);

router.get('/:breedName', breedController.showBreedPage);

router.get('/fetch/:breedName', breedController.fetchBreedData);

module.exports = router;