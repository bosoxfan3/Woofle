// 'use strict';

// if (!global.Promise) {
//   global.Promise = require('q');
// }
// //Is this necessary? If so, why? If not, why not?
// const {DATABASE_URL, PORT} = require('../config');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const jwt = require('jsonwebtoken');
// //should I delete these if they aren't used. Why aren't they used?
// const {app, runServer, closeServer} = require('../server.js');
// const User = require('../server/user/user.model.js');
// const {JWT_SECRET_KEY} = require('../config');
// const expect = chai.expect;
// chai.use(chaiHttp);

// const email = 'ddanfdnlafndklnfkldanfkldnl@example.com';
// const password = '12345678';

// describe('Login endpoints', function() {


//   before(function () {
//     return runServer(DATABASE_URL, PORT);
//   });

//   after(function() {
//     return closeServer();
//   });

//   beforeEach(function() {
//     return User.create({email, password});
//   }); 
  
//   afterEach(function() {
//     User.remove();
//   });


//   describe('/auth/login', function() {
//     it('Should reject requests with no credentials', function() {
//       return chai
//         .request(app)
//         .post('/auth/login')
//         .then(function(err, res) {
//           expect(res).to.have.status(401);
//         })
//         .catch(function (err) {
//         });
//     });
//     it('Should reject requests with no password', function() {
//       return chai
//         .request(app)
//         .post('/auth/login')
//         .send({email})
//         .then(function(err, res) {
//           expect(res).to.have.status(401);
//         })
//         .catch(function (err) {
//         });
//     });
//     it('Should reject requests with no email', function() {
//       return chai
//         .request(app)
//         .post('/auth/login')
//         .send({password})
//         .then(function(err, res) {
//           expect(res).to.have.status(401);
//         })
//         .catch(function (err) {
//         });
//     });
//     it('Should reject incorrect email and passwords', function() {
//       return chai
//         .request(app)
//         .post('/auth/login')
//         .send({email: 'pingas@pingas.com', password: 'pingas'})
//         .then(function(err, res) {
//           expect(res).to.have.status(401);
//         })
//         .catch(function (err) {
//         });
//     });
//     it('Should reject requests with incorrect emails', function() {
//       return chai
//         .request(app)
//         .post('/auth/login')
//         .send({email: 'pingas@pingas.com', password})
//         .then(function(err, res) {
//           expect(res).to.have.status(401);
//         })
//         .catch(function(err) {
//         });
//     });
//     it('Should reject request with incorrect passwords', function() {
//       return chai
//         .request(app)
//         .post('/auth/login')
//         .send({email, password: 'password'})
//         .then(function(err, res) {
//           expect(res).to.have.status(401);
//         })
//         .catch(function(err) {
//         });
//     });
//     it('Should allow requests with correct credentials', function() {
//       return chai
//         .request(app)
//         .post('/auth/login')
//         .send({email, password})
//         .then(function(err, res) {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('object');
//         })
//         .catch(function(err) {
//         });
//     });
//     // it('Should return a valid auth token', function() {
//     //   return chai
//     //     .request(app)
//     //     .post('/auth/login')
//     //     .send({email, password})
//     //     .then(function(err, res) {
//     //       expect(res).to.have.status(200);
//     //       expect(res.body).to.be.an('object');
//     //       const token = token;
//     //       expect(token).to.be.a('string');
//     //     });
//     // });

//     //I would like this one to work but can't figure out how to target
//     //the token. Also not sure that res.body is getting what I think it is
//   });
// });