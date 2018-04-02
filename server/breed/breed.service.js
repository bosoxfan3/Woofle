'use strict';

const axios = require('axios');

//API calls for DogCEO
const DOG_CEO_BREED_URL = 'https://dog.ceo/api/breed/';

function getDataFromDogCEOApi(searchTerm) {
  let query;
  if(searchTerm.indexOf(' ') >= 0) {
    let splitTerm = searchTerm.split(' ');
    query = `${splitTerm[1]}/${splitTerm[0]}/images`;
  } else {
    query = `${searchTerm}/images`;
  }
  return axios.get(DOG_CEO_BREED_URL+query)
    .then((data) => {
      return data.data;
    })
    .catch(err => {
      console.log(`Error in fetching images from dog CEO ${err}`);
      return Promise.reject(err);
    });
}

//API calls for YouTube
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromYouTubeApi(searchTerm) {
  const query = {
    q: `${searchTerm} dog breed`,
    part: 'snippet',
    key: 'AIzaSyBQV-GhhCOVYxkTVYtSzufauAvpVxNr_4o',
  };
  let queryString = '?';
  for (var key in query) {
    queryString += `${key}=${encodeURIComponent(query[key])}&`;
  }
  queryString = queryString.substr(0, queryString.length-1);
  return axios.get(YOUTUBE_SEARCH_URL+queryString)
    .then((data) => {
      return data.data.items;
    })
    .catch(err => {
      console.log(`Error in fetching videos from YouTube ${err}`);
      return Promise.reject(err);
    });
}

//API call for PetFinder
const PETFINDER_URL = 'https://api.petfinder.com/pet.find';

function getDataFromPetFinderApi(breedName) {
  breedName = breedName[0].toUpperCase()+breedName.slice(1);
  const query = {
    key: 'cea5cdb599585cf4d921ba8f2873e41f',
    animal: 'dog',
    breed: breedName,
    location: 94070,
    output: 'full',
    format: 'json'
  };
  let queryString = '?';
  for (var key in query) {
    queryString += `${key}=${encodeURIComponent(query[key])}&`;
  }
  queryString = queryString.substr(0, queryString.length-1);
  return axios.get(PETFINDER_URL+queryString)
    .then((data) => {
      return data.data.petfinder.pets.pet;
    })
    .catch(err => {
      console.log(`Error in fetching adoption data from PetFinder ${err}`);
      return Promise.reject(err);
    });
}

module.exports = {
  getDataFromDogCEOApi,
  getDataFromYouTubeApi,
  getDataFromPetFinderApi
};