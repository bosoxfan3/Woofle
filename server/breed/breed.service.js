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
      return Promise.reject(err);
    });
}
//This call is essentially the same as the front end except it is axios.get instead of
//.getJSON

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
      return data.data.items;
    })
    .catch(err => {
      console.log(`Error in fetching videos from YouTube ${err}`);
      return Promise.reject(err);
    });
}
//This call is essentially the same as the front end except we had to re-write the
//query object into queryString because we couldn't just do a .getJSON 
//and pass in the query object with axios

//Backend API call for Giphy
let key = 'XI2lIsawKnSI6Q4Tdr7wnSc3wu7bsgPd';

module.exports = {
  getDataFromDogCEOApi,
  getDataFromYouTubeApi
};