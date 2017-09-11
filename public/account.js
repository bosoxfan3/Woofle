$(function () {
  $('.signup-form').submit(function (e) {
    e.preventDefault();
    var userSignUpDetails = {
      email: $('#user-email').val(),
      password: $('#user-password').val()
    };
    console.log(userSignUpDetails);
    $.ajax({
      url: '/users/signup',
      data: userSignUpDetails,
      method: 'POST'
    })
      .done(function (done) {
        window.location.href = done.url;
      })
      .fail(function (fail) {
        console.log(fail);
      });
  });
});