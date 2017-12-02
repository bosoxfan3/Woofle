'use strict';

function drawFavoritesList(favorites) {
  let html = '';
  $.each(favorites, function (index, value) {
    console.log(value)
    html += '<div class="favorite-breed">';
    html += '<p class="breed-title">' + value.toUpperCase() + '</p>';
    // html += '<a class="breed-link" href="/breeds/' + value + '">' + value.toUpperCase() + "</a>";
    html += '<a href="/breeds/'+value+'" class="view-breedpage-button" type="button">View Breed</a>';
    html += '<button class="remove-button" type="button" onclick="doRemoveFavorite(\'' + value +  '\');">Remove</button>';
    html += '</div>';
  });
  $('.js-favorites-div').html(html);
}

function doRemoveFavorite(breedName) {
  $.ajax({
    url: '/api/favorites/' + breedName,
    type: 'DELETE',
    success: function(favoritesList) {
      drawFavoritesList(favoritesList);
    }
  });
}
//this function isn't called because it is included in every button in the 
//html that is built by the drawFavoritesList function above

function getFavorites() {
  $.getJSON('/api/favorites/all', {}, function (favorites) {
    drawFavoritesList(favorites);
  });
}
getFavorites();
//This gets called as soon as the html page is loaded.

$('.js-go-to-search-button').click(function(event) {
  window.location.href = '/search';
});

$('.js-log-out-button').click(function(event) {
  window.location.href = '/auth/logout';
});

