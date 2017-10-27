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
// let Cookie = '';

// describe('Logout endpoint', function() {

//   before(function () {
//     return runServer(DATABASE_URL, PORT);
//   });

//   after(function() {
//     return closeServer();
//   });

//   beforeEach(function(done) {
//     User.create({email, password})
//       .then(function() {
//         chai.request(app)
//           .post('/auth/login')
//           .send({email, password})
//           .end(function(err, res) {
//             Cookie = res.headers['set-cookie'].pop().split(';')[0].substr(13);
//             done();
//           });
//       });
//   }); 
  
//   afterEach(function() {
//     return User.remove({email});
//   });

//   describe('/auth/logout', function() {
//     it('Should remove the token when logging out', function() {
//       return chai
//         .request(app)
//         .get('/auth/logout')
//         .set('woofle-token', Cookie)
//         .then(function(err, res) {
//           expect(res).to.have.status(302);
//           expect(res).to.redirectTo('/auth/login');
//           expect(res).to.not.have.cookie('woofle-token');
//         })
//         .catch(function (err) {
//         });        
//     }); 
//   });
// });