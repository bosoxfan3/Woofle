'use strict';

function drawFavoritesList(favorites) {
  let html = '';
  $.each(favorites, function (index, value) {
    html += '<div class="favorite-breed">';
    html += '<p class="breed-title">' + value.toUpperCase() + '</p>';
    html += '<input class="button view-breedpage-button" type="button" onclick="location.href=`/breeds/'+value+'`;" value="View Breed" />';
    html += '<button class="button remove-button" type="button" onclick="doRemoveFavorite(\'' + value +  '\');">Remove</button>';
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
//this function isn't called but it is included in every button built above

function getFavorites() {
  $.getJSON('/api/favorites/all', {}, function (favorites) {
    drawFavoritesList(favorites);
  });
}

$(document).ready(function() {
  getFavorites();
});