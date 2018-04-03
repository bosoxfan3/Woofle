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
  let name;
  let age;
  let breeds;
  let city;
  let email;
  let phone;
  for (let i=0; i<8; i++) {
    if (!result[i].media.photos) {
      image = '<p class="no-photos">No photos available</p>';
    } else {
      image = getAdoptionImage(result[i].media.photos.photo);
    }
    if (result[i].breeds.breed.length) {
      breeds = '<p>';
      for (let j=0; j<result[i].breeds.breed.length; j++) {
        if (j === 0) {
          breeds += `${result[i].breeds.breed[0]['$t']}`;
        } else {
          breeds += `, ${result[i].breeds.breed[j]['$t']}`;
        }
      }
      breeds += '</p>';
    } else {
      breeds = `<p>${result[i].breeds.breed['$t']}`;
    }
    name = !result[i].name['$t']? 'No name listed' : result[i].name['$t'];
    age = !result[i].age['$t']? 'No age listed' : result[i].age['$t'];
    city = !result[i].contact.city['$t']? 'No city listed' : `${result[i].contact.city['$t']}, ${result[i].contact.state['$t']}`;
    email = !result[i].contact.email['$t']? 'No email listed' : result[i].contact.email['$t'];
    phone = !result[i].contact.phone['$t']? 'No phone listed' : result[i].contact.phone['$t'];
    html += (
      `<div class="row">
        <div class="col-12 adoption-div">
          <div class="col-4">
            <div class="adoption-name">
              <h3>Name: ${name}</h3>
              <p>Age: ${age}</p>
              ${breeds}
            </div>
          </div>
          <div class="col-4 adoption-image-div">
            ${image}
          </div>
          <div class="col-4">
            <div class="adoption-info">
              <p>City: ${city}</p>
              <p>Contact Email: ${email}</p>
              <p>Contact Phone: ${phone}</p>
            </div>
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
  html += '<div class="col-12">';
  for (let i=0; i<result.length; i++) {
    html += `
      <div class="col-3 image-div">
        <img class="dog-image" border="6px" src=${result[i]}>
      </div>`;
  }
  html += '</div>';
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
  $('.saved-favorites').attr('hidden', true);
});

$('.js-show-videos').click(function() {
  $('.js-images-div').attr('hidden', true);
  $('.js-videos-div').removeAttr('hidden');
  $('.js-adoption-div').attr('hidden', true);
  $('.saved-favorites').attr('hidden', true);
});

$('.js-show-adoptions').click(function() {
  $('.js-images-div').attr('hidden', true);
  $('.js-videos-div').attr('hidden', true);
  $('.js-adoption-div').removeAttr('hidden');
  $('.saved-favorites').attr('hidden', true);
});

$('.js-add-favorites').click(() => {
  $.ajax({
    url: '/api/favorites/' + resultDog,
    method: 'POST',
    data: {breed: resultDog}
  })
    .done(function(done) {
      $('.saved-favorites').html('<p>Added To My Favorites</p>').removeAttr('hidden', true);
    })
    .fail(function (fail) {
      console.log(fail);
    });
});