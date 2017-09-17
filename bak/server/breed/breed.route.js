var express = require('express');
const expressJwt = require('express-jwt');
var router = express.Router();
var path = require('path');

const breedController = require('./breed.controller');
const config = require('../../config');

router.route('/:breedName')
  .get(function(req, res, next) {
    // load the Breed page and the Breed client application
    //Brings up the breeds/specificdog page which then instantly starts
    //the frontend API calls
    res.sendFile(path.resolve('public/breed.html'));
  });

//When the breed is searched, this saves the breed that is input
//and redirects to the breeds/specificdog page
router.get('/search/:breedName', function(req, res, next) {
  res.json({url: '/breeds/' + req.params.breedName});
});


/**
 * Allow users to add favorite breed
 */
// router.route('/fetch/:breedName')
//   .get(expressJwt(breedController.fetchBreedData);

module.exports = router;
