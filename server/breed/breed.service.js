const axios = require('axios');

// Frontend API calls for DogCEO and YouTube
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
      return data.data
    })
    .catch(err => {
      console.log(`Error in fetching images from dog CEO ${err}`)
      return Promise.reject(err)
    })
}

module.exports = {
  getDataFromDogCEOApi
}