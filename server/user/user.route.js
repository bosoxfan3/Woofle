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

//THIS CAN BE DELETED. THEN JUST MAKE SURE TO TAKE OUT ANY REFERENCES OF IT IN THE 
//SERVER. WE DON'T NEED USERS/FAVORITES TO SEE THE FAVORITES BECAUSE THERE IS ALSO
//A /FAVORITES ROUTE AND ALL OF THE VIEW FAVORITES BUTTONS GO TO /FAVORITES INSTEAD
