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

$('.js-view-favorites-button').click(function(event) {
  $.ajax({
    url: '/api/favorites/',
    method: 'GET'
  })
    .done(function (done) {
      console.log(done);
      //window.location.href = done
      //window.location.href = 'favorites';
    })
    .fail(function (fail) {
      console.log(fail);
    });
});




