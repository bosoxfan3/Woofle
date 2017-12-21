'use strict';

$(function() {
  $('#signup-form').submit(function(event) {
    event.preventDefault();
    let userSignUpDetails = {
      email: $('#user-email').val(),
      password: $('#user-password').val()
    };
    $.ajax({
      url: '/auth/signup',
      data: userSignUpDetails,
      method: 'POST'
    })
      .done(function(done) {
        window.location.href = done.url;
      })
      .fail(function(fail) {
        console.log(fail);
      });
  });
});

$(function() {
  $('#login-form').submit(function(event) {
    event.preventDefault();
    let userLogInDetails = {
      email: $('#user-email').val(),
      password: $('#user-password').val()
    };
    $.ajax({
      url: '/auth/login',
      data: userLogInDetails,
      method: 'POST'
    })
      .done(function(done) {
        window.location.href = done.redirect;
        //.redirect works because in the auth controller the done object
        //sent back has key redirect and value /search
      })
      .fail(function(fail) {
        console.log(fail);
      });
  });
});

$(function() {
  $('.js-demo-link').click(function(event) {
    event.preventDefault();
    let demoLogin = {
      email: 'daniel@gmail.com',
      password: '1234'
    };
    $.ajax({
      url: '/auth/login',
      data: demoLogin,
      method: 'POST'
    })
      .done(function(done) {
        window.location.href = done.redirect;
      })
      .fail(function(fail) {
        console.log(fail);
      });
  });
});