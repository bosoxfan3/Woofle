var express = require('express');
var router = express.Router();

const favorites = {};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(favorites);
});

router.post('/', function(req, res, next) {
  
});

module.exports = router;