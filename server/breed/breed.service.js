'use strict';

require('dotenv').config();
const axios = require('axios');

//API calls for DogCEO
const DOG_CEO_BREED_URL = 'https://dog.ceo/api/breed/';

function getDataFromDogCEOApi(searchTerm) {
  let query;
  if (searchTerm.indexOf(' ') >= 0) {
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
    key: `${process.env.youTubeAPIKey}`,
  };
  let queryString = '?';
  for (var key in query) {
    queryString += `${key}=${encodeURIComponent(query[key])}&`;
  }
  queryString = queryString.substr(0, queryString.length-1);
  console.log(queryString);
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
  if (breedName.indexOf(' ') >= 0) {
    let splitTerm = breedName.split(' ');
    let firstWord = splitTerm[0][0].toUpperCase()+splitTerm[0].slice(1);
    let secondWord = splitTerm[1][0].toUpperCase()+splitTerm[1].slice(1);
    breedName = firstWord+' '+secondWord;
  } else {
    breedName = breedName[0].toUpperCase()+breedName.slice(1);
  }
  const query = {
    key: `${process.env.petFinderAPIKey}`,
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
  console.log(queryString);
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