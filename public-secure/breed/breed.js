'use strict';

let image;

function getDataFromAllApis(searchTerm) {
  $.get('/breeds/fetch/'+searchTerm)
    .done(function ({imageUrls, youTubeData, adoptionData}) {
      showDogImages(imageUrls);
      showYouTubeResults(youTubeData);
      console.log(adoptionData);
      showAdoptionData(adoptionData);
    })
    .fail(function (error) {
      console.log(error);
    });
}

function showAdoptionData(result) {
  let html = '';
  for (let i=0; i<5; i++) {
    if (result[i].media.photos.photo.length === 0) {
      image = '<img class=\'adoption-image\' src=\'\' alt=\'No photos available\'>';
    } else {
      image = getAdoptionImage(result[i].media.photos.photo);
    }
    html += (
      `<div class="row">
        <div class="col-12">
          <div class="col-4">
            <h3>Name: ${result[i].name['$t']}</h3>
            <p>Age: ${result[i].age['$t']}</p>
          </div>
          <div class="col-4 adoption-image-div">
            ${image}
          </div>
          <div class="col-4">
            <p>City: ${result[i].contact.city['$t']}</p>
            <p>Contact Email: ${result[i].contact.email['$t']}</p>
            <p>Contact Phone: ${result[i].contact.phone['$t']}</p>
          </div>
        </div>
      </div>`);
  }
  $('.js-adoption-div').append(html);
}

function getAdoptionImage(array) {
  for (let i=0; i<array.length; i++) {
    if (array[i]['@size'] === 'x' || array[i]['@size'] === 'pn') {
      return image = `<img class='adoption-image' src=${array[i]['$t']} alt='Adoption image'>`;
    }
  }
  return image = '<img class=\'adoption-image\' src=\'\' alt=\'No photos available\'>';
}

function showDogImages(result) {
  let html = '';
  for (let i=0; i<result.length; i++) {
    html += `<img class="dog-image col-3" border="8px" src=${result[i]}>`;
  }
  $('.js-images-div').append(html);
}

function showYouTubeResults(result) {
  let html = ' ';
  $.each(result, function(index, value) {
    if (value.id.videoId) {
      let videoLink = 'https://www.youtube.com/watch?v=' + value.id.videoId;
      let embedLink = 'https://www.youtube.com/embed/' + value.id.videoId;
      if ((value.snippet.title).length > 35) {
        value.snippet.title = (value.snippet.title).substr(0, 35) + '...';
      }
      html += `<div title="youtube-video-${index}"><iframe width="350" height="250" src="${embedLink}"></iframe>` +
              '<br>' +
              `<a href="${videoLink}">${value.snippet.title}</a></div>`;
    }
  });
  $('.js-videos-div').append(html);
}

let resultDog = window.location.pathname.replace('/breeds/', '');
if (resultDog.indexOf('%20') >= 1) {
  resultDog = resultDog.split('%20');
  resultDog = resultDog[0]+' '+resultDog[1];
}
$('h1').html(resultDog.toUpperCase());
getDataFromAllApis(resultDog);
//getting the breed name from the backend and using it to add a title
//and make API calls

$('.js-show-images').click(function() {
  $('.js-images-div').removeAttr('hidden');
  $('.js-videos-div').attr('hidden', true);
  $('.js-adoption-div').attr('hidden', true);
});

$('.js-show-videos').click(function() {
  $('.js-images-div').attr('hidden', true);
  $('.js-videos-div').removeAttr('hidden');
  $('.js-adoption-div').attr('hidden', true);
});

$('.js-show-adoptions').click(function() {
  $('.js-images-div').attr('hidden', true);
  $('.js-videos-div').attr('hidden', true);
  $('.js-adoption-div').removeAttr('hidden');
});

$('.js-add-favorites').click(() => {
  $.ajax({
    url: '/api/favorites/' + resultDog,
    method: 'POST',
    data: {breed: resultDog}
  })
    .done(function(done) {
      $('p').append('Added To My Favorites');
    })
    .fail(function (fail) {
      console.log(fail);
    });
});