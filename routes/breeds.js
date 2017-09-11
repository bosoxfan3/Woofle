var express = require('express');
var router = express.Router();
var https = require('https');
var path = require('path');

/* GET users listing. /breeds/breeds/:parameter */
router.get('/search/:dog', function(req, res, next) {
  let query;
  if(req.params.dog.indexOf('_') >= 0) {
    let splitTerm = req.params.dog.split('_');
    query = `${splitTerm[1]}/${splitTerm[0]}/images`;
  } else {
    query = `${req.params.dog}/images`;
  }
  https.get('https://dog.ceo/api/breed/'+query, (result) => {
    let rawData = '';
    result.on('data', (chunk) => { rawData += chunk; });
    result.on('end', () => {
      try {
        // this data to show on breeds.html
        //const parsedData = JSON.parse(rawData);
        // res.send(parsedData);
        // res.redirect('/breeds/breedPage');
        res.json({url: '/breeds/breedPage/' + req.params.dog});
      } catch (e) {
        console.error(e.message);
      }
    });
  });
});

router.get('/breedPage/:dog', function (req, res, next) {
  console.log('on breed page');
  console.log(req.params.dog);
  res.sendFile(path.resolve('public/breed.html'));
});


module.exports = router;

