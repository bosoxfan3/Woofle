$('.js-search-button').click(function(event) {
  let typedInput = $('#breedSearch').val().toLowerCase();
  $.ajax({
    url: '/breeds/search/' + typedInput,
    method: 'GET',
  })
    .done(function (done) {
      window.location.href = done.url;
    })
    .fail(function (fail) {
      console.log(fail);
    });
  $('#breedSearch').val('');
});
//makes call to breeds/search/:breedName route on the backend.
//then uses the saveInputFromBreedSearch backend function to return a url
//and then the .done in line 7 redirects to that url, which triggers
//that route and it's corresponding functions on the backend

//array of all breeds for random search purposes. is in all lower case to
//match the fact that regular search value is translated to all lower case
const dogBreedArray = ['affenpinscher', 'african', 'airedale'];

$('.js-random-search-button').click(function(event) {
  let typedInput = dogBreedArray[Math.floor(Math.random() * dogBreedArray.length)];
  $.ajax({
    url: '/breeds/search/' + typedInput,
    method: 'GET',
  })
    .done(function (done) {
      window.location.href = done.url;
    })
    .fail(function (fail) {
      console.log(fail);
    });
  $('#breedSearch').val('');  
});

$('.js-view-favorites-button').click(function(event) {
  window.location.href = 'favorites';
});

$('.js-log-out-button').click(function(event) {
  window.location.href = '/auth/logout';
})




