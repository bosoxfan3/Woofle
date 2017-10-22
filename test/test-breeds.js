// 'use strict';

// if (!global.Promise) {
//   global.Promise = require('q');
// }
// //Is this necessary? If so, why? If not, why not?
// const {DATABASE_URL, PORT} = require('../config');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const jwt = require('jsonwebtoken');
// const {app, runServer, closeServer} = require('../server.js');
// const User = require('../server/user/user.model.js');
// const {JWT_SECRET_KEY} = require('../config');
// const expect = chai.expect;
// chai.use(chaiHttp);

// const email = 'daniel@example.com';
// const password = '12345678';

// describe('Search endpoint', function() {

//   before(function () {
//     return runServer(DATABASE_URL, PORT);
//   });

//   after(function() {
//     User.remove({email});
//     return closeServer();
//   });

//   beforeEach(function() {
//     return User.create({email, password});
//   }); 
  

//   describe('Breed endpoint', function() {
//     it('Should add breed to favorites when favorites button clicked', function() {
//       return chai 
//         .request(app)
//         .post('/api/favorites/akita')
//         .then(function(err, res) {
//           expect(res).to.be.an('array');
//           expect(res).to.have.lengthOf(1);
//         })
//         .catch(function (err) {
//         });
//     });
//   });
// });