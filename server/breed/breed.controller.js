'use strict';

const _ = require('lodash');
const breedService = require('./breed.service');
const path = require('path');

function fetchBreedData(req, res, next) {
  const breedName = req.params.breedName;
  Promise.all([
    breedService.getDataFromDogCEOApi(breedName),
    breedService.getDataFromYouTubeApi(breedName)
  ])
    .then(([data, youTubeData]) => {
      const imageUrls = _.slice(data.message,0 ,5);
      return res.json({imageUrls, youTubeData});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
}

function showBreedPage(req, res, next) {
  res.sendFile(path.resolve('public/breed.html'));
  //Brings up the breeds/specificdog page which then instantly starts
  //the frontend API calls
}

function saveInputFromBreedSearch(req, res, next) {
  res.json({url: '/breeds/' + req.params.breedName});
  //When the breed is searched, this saves the breed that is input
  //and returns the url to the breeds/specificdog page. The switch to the
  //specific page is then taken care of on the front end with the .done part
  //of the ajax call
}

module.exports = {
  fetchBreedData,
  showBreedPage,
  saveInputFromBreedSearch
};