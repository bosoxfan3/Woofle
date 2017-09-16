const _ = require('lodash')
const breedService = require('./breed.service')

function fetchBreedData(req, res, next) {
  const breedName = req.params.breedName;

  breedService.getDataFromDogCEOApi(breedName)
    .then(data => {
      const imageUrls = _.slice(data.message,0 ,5)
      return res.json(imageUrls)
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
}

module.exports = {
  fetchBreedData
}