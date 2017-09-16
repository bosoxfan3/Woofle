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
  $.getJSON(DOG_CEO_BREED_URL+query, {}, function(data) {
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

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromYouTubeApi(searchTerm) {
  const query = {
    q: `${searchTerm} dog`,
    part: 'snippet',
    key: 'AIzaSyBQV-GhhCOVYxkTVYtSzufauAvpVxNr_4o',
  };

  $.getJSON(YOUTUBE_SEARCH_URL, query, function (data) {
    showYouTubeResults(data.items);
  });
}

function showYouTubeResults(result) {
  var html = ' ';
  $.each(result, function (index, value) {
    if (value.id.videoId) {
      var videoLink = 'https://www.youtube.com/watch?v=' + value.id.videoId;
      html += `<a href="${videoLink}"><img src="${value.snippet.thumbnails.default.url}"/></a>`;
    }
  });
  $('.js-videos-div').append(html);
}
//

//getting the breed name from the backend and using it to add a title
//and make API calls
let resultDog = window.location.pathname.replace('/breeds/', '');
if (resultDog.indexOf('%20') >= 1) {
  resultDog = resultDog.split('%20');
  resultDog = resultDog[0]+' '+resultDog[1];
}
$('h1 span').html(resultDog.toUpperCase());

getDataFromDogCEOApi(resultDog);
getDataFromYouTubeApi(resultDog);
//

//IN PROGRESS. Working with adding to favorites
$('.js-add-to-favorites-button').click(event => {
  console.log('button clicked');
  $.ajax({
    url: '/favorites/:_id',
    method: 'POST',
    data: {breed: resultDog}
  })
    .done(function (done) {
      console.log(done);
    })
    .fail(function (fail) {
      console.log(fail);
    });
});