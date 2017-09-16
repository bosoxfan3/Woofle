var express = require('express');
var router = express.Router();
var https = require('https');
var path = require('path');

//When the breed is searched, this saves the breed that is input
//and redirects to the breeds/specificdog page
router.get('/search/:dog', function(req, res, next) {
  res.json({url: '/breeds/' + req.params.dog});
});

//Brings up the breeds/specificdog page which then instantly starts
//the frontend API calls
router.get('/:dog', function (req, res, next) {
  res.sendFile(path.resolve('public/breed.html'));
});

module.exports = router;

