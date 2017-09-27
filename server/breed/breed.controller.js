'use strict';

const _ = require('lodash');
const breedService = require('./breed.service');
const path = require('path');

function fetchBreedData(req, res, next) {
  const breedName = req.params.breedName;
  Promise.all([
    breedService.getDataFromDogCEOApi(breedName),
    breedService.getDataFromYouTubeApi(breedName),
  ])
    .then(([imageData, youTubeData]) => {
      const imageUrls = _.slice(imageData.message,0 ,5);
      return res.json({imageUrls, youTubeData});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
}
//Promise.all makes sure this gets started after the data has been retrieved from both APIs.
//This makes it so they load at the same time. Also if you go to the endpoint breed/fetch/breedName
//in the browser you will see the two objects that are returned in line 15

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