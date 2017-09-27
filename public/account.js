// $(function () {
//   $('.signup-form').submit(function (e) {
//     e.preventDefault();
//     var userSignUpDetails = {
//       email: $('#user-email').val(),
//       password: $('#user-password').val()
//     };
//     console.log(userSignUpDetails);
//     $.ajax({
//       url: '/auth/signup',
//       data: userSignUpDetails,
//       method: 'POST'
//     })
//       .done(function (done) {
//         console.log("DONE: " + JSON.stringify(done));
//         window.location.href = "/";
//         //window.location.href = done.url;
//       })
//       .fail(function (fail) {
//         console.log(fail);
//       });
//   });
// });

//Probably unnecessary since the form submits automatically to the endpoint listed
//in the HTML. Then the endpoint takes care of what is done in the rest of the function
