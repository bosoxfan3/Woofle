function getDataFromDogCEOApi(searchTerm) {
  let query;
  if(searchTerm.indexOf(' ') >= 0) {
    let splitTerm = searchTerm.split(' ');
    query = `${splitTerm[1]}/${splitTerm[0]}/images`;
  } else {
  query = `${searchTerm.replace(' ', '_')}`;
  }
  $.get('/breeds/'+query, {}, function(data) {
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

const DOG_CEO_BREED_URL = 'https://dog.ceo/api/breed/';

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

const resultDog = window.location.pathname.replace('/breeds/breedPage/', '');
console.log(resultDog);

getDataFromDogCEOApi(resultDog);
getDataFromYouTubeApi(resultDog);
$('#breedSearch').val('');