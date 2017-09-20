'use strict';


function drawFavoritesList(favorites) {
  //let html = '<button type="button" onclick="alert("foo");">Remove Favorite</button>';
  let html = '';
  $.each(favorites, function (index, value) {
    console.log("value: " + value);
    html += '<p>';
    html += '<a href="/breeds/' + value + '">' + value + "</a>";
    html += '<button type="button" onclick="doRemoveFavorite(\'' + value +  '\');">Remove</button>';
    //  html += '<button type="button" onclick="alert("foo");">Remove Favorite</button>';
    html += '</p>';
  });

  $('.js-favorites-div').html(html);
}

function doRemoveFavorite(breedName) {
  console.log("DoRemoveFavorite: " + breedName);
  $.ajax({
    url: '/api/favorites/' + breedName,
    type: 'DELETE',
    success: function(favoritesList) {
      drawFavoritesList(favoritesList);
    }
  });
}

function getFavorites() {
  $.getJSON("/api/favorites/all", {}, function (favoritesList) {
    drawFavoritesList(favoritesList);
  });
}
getFavorites();

$('.js-go-to-search-button').click(function(event) {
  window.location.href = 'search';
});

$('.js-log-out-button').click(function(event) {
  window.location.href = '/auth/logout';
});