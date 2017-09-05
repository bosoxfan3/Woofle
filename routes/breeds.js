var express = require('express');
var router = express.Router();
var https = require('https');

/* GET users listing. */
router.get('/:search', function(req, res, next) {
  let query;
  if(req.params.search.indexOf('_') >= 0) {
    let splitTerm = req.params.search.split('_');
    query = `${splitTerm[1]}/${splitTerm[0]}/images`;
  } else {
    query = `${req.params.search}/images`;
  }
  https.get('https://dog.ceo/api/breed/'+query, (result) => {
    let rawData = '';
    result.on('data', (chunk) => { rawData += chunk; });
    result.on('end', () => {
      try {
        console.log(rawData);
        console.log(query);
        const parsedData = JSON.parse(rawData);
        
        res.send(parsedData);
      } catch (e) {
        console.error(e.message);
      }
    });
  });

});


router.post('/', function(req, res, next) {
  
});

module.exports = router;

