var express = require('express');
var router = express.Router();
var User = require('../server/user/user.model')


const favorites = {};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(favorites);
});

router.post('/:id', function(req, res, next) {
  //res.send(req.body);
  User
    .findOneAndUpdate({_id: req.params.id}, {favorites: {$push: req.body.breed}})
    
  // if signed in user, then add to that users favorites.
});

module.exports = router;