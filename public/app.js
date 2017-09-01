'use strict';
// 1. state
const STATE = {
  view: 'start',
  results: [],
};

const PAGE_ELEMENTS = {
  'start': $('.js-start-page'),
  'breed': $('.js-breed-page'),
  'adoption': $('.js-adoption-page')
};

//2. state view switch
function renderApp(state, elements) {
  Object.keys(elements).forEach(function(view) {
    elements[view].hide();
  });
  elements[state.view].show();
  if (state.route === 'start') {
    renderStartPage(state, elements[STATE.view]);
  }
  else if (state.route === 'breed') {
    renderBreedPage(state, elements[STATE.view]);
  }
  else if (state.route === 'adoption') {
    renderAdoptionPage(state, elements[STATE.view]);
  }
}

//3. api search
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';