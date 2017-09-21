'use strict';

const axios = require('axios');

//Backend API calls for DogCEO so that we only get 5 images
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
    })
}

module.exports = {
  getDataFromDogCEOApi
};