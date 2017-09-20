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
  window.location.href = 'favorites';
});

$('.js-log-out-button').click(function(event) {
  window.location.href = '/auth/logout';
})




