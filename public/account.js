$(function () {
  $('#signup-form').submit(function (event) {
    event.preventDefault();
    var userSignUpDetails = {
      email: $('#user-email').val(),
      password: $('#user-password').val()
    };
    console.log(userSignUpDetails);
    $.ajax({
      url: '/auth/signup',
      data: userSignUpDetails,
      method: 'POST'
    })
      .done(function (done) {
        console.log("DONE: " + JSON.stringify(done));
        window.location.href = done.redirect;
      })
      .fail(function (fail) {
        console.log(fail);
      });
  });
});

$(function () {
  $('#login-form').submit(function (event) {
    event.preventDefault();
    var userLogInDetails = {
      email: $('#email').val(),
      password: $('#password').val()
    };
    console.log(userLogInDetails);
    $.ajax({
      url: '/auth/login',
      data: userLogInDetails,
      method: 'POST'
    })
      .done(function (done) {
        console.log("DONE: " + JSON.stringify(done));
        window.location.href = done.redirect;
        //.redirect works because in the auth controller the done object
        //sent back has key redirect and value /search
      })
      .fail(function (fail) {
        console.log(fail);
      });
  });
});

//Probably unnecessary since the form submits automatically to the endpoint listed
//in the HTML. Then the endpoint takes care of what is done in the rest of the function
