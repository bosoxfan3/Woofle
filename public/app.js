'use strict';

let MOCK_BREED_RESULTS = {
  'breedResults': [
    {
      'breedName': 'Golden Retriever',
      'videoID': [
        'cyN288Tg2Ms',
        'n7-o7eoMaWM'
      ],
      'wikipediaTitle': 'Golden Retriever',
    },
    {
      'breedName': 'German Shepherd',
      'videoID': [
        'M-uDiky1EKU',
        '4uWVDE5CkLw'
      ],
      'wikipediaTitle': 'German Shepherd'
    },
    {
      'breedName': 'Beagle',
      'videoID': [
        'BAf7lcYEXag',
        'f9JPDHAEMqs'
      ],
      'wikipediaTitle': 'Beagle'
    }
  ]
};

const DOG_CEO_BREED_URL = 'https://dog.ceo/api/breed/';

function getDataFromDogCEOApi(searchTerm) {
  let query;
  if(searchTerm.indexOf(' ') >= 0) {
    let splitTerm = searchTerm.split(' ');
    query = `${splitTerm[1]}/${splitTerm[0]}/images`;
  } else {
    query = `${searchTerm}/images`;
  }
  $.get(DOG_CEO_BREED_URL+query, {}, function(data) {
    showDogImages(data);
  });
}

function showDogImages(result) {
  let html = '';
  for (let i=0; i<5; i++) {
    html += `<img src=${result.message[i]}>`;
  }
  $('.js-images-div').append(html);
}

$('.js-search-button').click(function(event) {
  event.preventDefault();
  let typedInput = $('#breedSearch').val().toLowerCase();
  getDataFromDogCEOApi(typedInput);
  $('#breedSearch').val('');
});

// // 1. state
// const STATE = {
//   view: 'start',
//   results: [],
// };

// const PAGE_ELEMENTS = {
//   'start': $('.js-start-page'),
//   'breed': $('.js-breed-page'),
//   'adoption': $('.js-adoption-page')
// };

// //2. state view switch
// function renderApp(state, elements) {
//   Object.keys(elements).forEach(function(view) {
//     elements[view].hide();
//   });
//   elements[state.view].show();
//   if (state.route === 'start') {
//     renderStartPage(state, elements[STATE.view]);
//   }
//   else if (state.route === 'breed') {
//     renderBreedPage(state, elements[STATE.view]);
//   }
//   else if (state.route === 'adoption') {
//     renderAdoptionPage(state, elements[STATE.view]);
//   }
// }

// //3. api search
// const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';