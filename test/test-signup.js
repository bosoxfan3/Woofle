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


// describe('Signup endpoint', function() {
//   before(function () {
//     return runServer(DATABASE_URL, PORT);
//   });
  
//   after(function() {
//     return closeServer();
//   });
    
//   afterEach(function() {
//     User.find().remove().exec();
//     return User.create({email: 'daniel@gmail.com', password: '1234'});
//   });

//   describe('/auth/signup', function() {
//     it('Should not allow signup with no credentials', function() {
//       return chai
//         .request(app)
//         .post('/auth/signup')
//         .then(function(err, res) {
//           expect(res).to.have.status(400);
//         })
//         .catch(function (err) {
//         });
//     });
//     it('Should not allow signup with no password', function() {
//       return chai
//         .request(app)
//         .post('/auth/signup')
//         .send({email: 'pingas@pingas.com'})
//         .then(function(err, res) {
//           expect(res).to.have.status(400);
//         })
//         .catch(function(err) {
//         });
//     });
//     it('Should not allow signup with no email', function() {
//       return chai
//         .request(app)
//         .post('/auth/signup')
//         .send({password: 'pingas'})
//         .then(function(err, res) {
//           expect(res).to.have.status(400);
//         })
//         .catch(function(err) {
//         });
//     });
//     it('Should not allow signup with duplicate email', function() {
//       return chai
//         .request(app)
//         .post('/auth/signup')
//         .send({email: 'daniel@gmail.com', password: '12345678'})
//         .then(function(err, res) {
//           expect(res).to.have.status(400);
//         })
//         .catch(function(err) {
//         });
//     });
//     it('Should allow signup with unique email', function() {
//       return chai
//         .request(app)
//         .post('/auth/signup')
//         .send({email: 'pingas@pingas.com', password: '1234'})
//         .then(function(err, res) {
//           expect(res).to.have.status(302);
//           expect(res).to.redirect('/auth/login');
//           //not 201 here because although user is created, they are then redirected
//           //which makes it a 302 status for 'Found'
//         })
//         .catch(function(err) {
//         });
//     });
//   });
// });  