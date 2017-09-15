var express = require('express');
var router = express.Router();
var User = require('../models');


const favorites = {};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(favorites);
});

router.post('/', function(req, res, next) {
  res.send(req.body);
  
  // if signed in user, then add to that users favorites.
});

module.exports = router;