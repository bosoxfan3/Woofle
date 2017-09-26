'use strict';

const axios = require('axios');

//Backend API calls for DogCEO
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
      console.log(`Error in fetching images from dog CEO ${err}`)
      return Promise.reject(err)
    });
}

//Backend API calls for YouTube
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
      console.log(data.data.items);
      return data.data.items;
    })
    .catch(err => {
      console.log(`Error in fetching videos from YouTube ${err}`)
      return Promise.reject(err);
    });
}

module.exports = {
  getDataFromDogCEOApi,
  getDataFromYouTubeApi
};