'use strict';

if (!global.Promise) {
  global.Promise = require('q');
}
//Is this necessary? If so, why? If not, why not?
const {DATABASE_URL, PORT} = require('../config');
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const {app, runServer, closeServer} = require('../server.js');
const User = require('../server/user/user.model.js');
const {JWT_SECRET_KEY} = require('../config');
const expect = chai.expect;
chai.use(chaiHttp);

const email = 'daniel@yahoo.com';
const password = '1234';

describe('Search endpoint', function() {

  before(function () {
    return runServer(DATABASE_URL, PORT);
    // User.create({email, password});
    // console.log(user);
    // const request = chai.request(app);
    // return request
    //   .post('/auth/login')
    //   .send({email, password})
    //   .end(function(err, res) {
    //     res.should.have.status(200);
    //   });
  });

  after(function() {
    return closeServer();
  });

  beforeEach(function(done) {
    User.create({email, password})
      .then(function() {
        chai.request(app)
          .post('/auth/login')
          .send({email, password})
          .end(function(err, res) {
            console.log(res.type);
            // Cookie = res.headers['set-cookie'].pop().split(';')[0];
            done();
          });
      });
  }); 
  
  afterEach(function() {
    return User.remove({email});
  });

  describe('Search page', function() {
    it('should get all breeds for the dropdown menu', function() {
      return chai
        .request(app)
        .post('/auth/login')
        .send({email, password})
        .get('/breeds/all')
        .exec()
        .then(function(err, res) {
          expect(res).to.be.an('array');
          expect(res).to.have.status(200);
          expect(res).to.have.lengthOf(121);
          expect(res).to.have.property('[0].value', 'textInput');
        })
        .catch(function (err) {
        });
    });
    // it('should allow users to select a breed and search', function() {
    //   return chai
    //     .request(app)
    //     .get('/breeds/search/akita')
    //     .then(function(err, res) {
    //       expect(res).to.be.an('object');
    //       expect(res).to.have.property('imageUrls', 'youTubeData');
    //       expect(res.body.imageUrls).to.be.schema({ type: 'array', minItems: 1, maxItems: 8 });
    //       expect(res.body.youTubeData).to.be.schema({ type: 'array', minItems: 1, maxItems: 5 });
    //     })
    //     .catch(function (err) {
    //     });
    // });
    // // it('should allow users to perform a random search', function() {
    // //   return chai
    // //     .request(app)
    // //     .get()
    // // });
    // it('should go to my favorites page when my favorites button clicked', function() {
    //   return chai
    //     .request(app)
    //     .get('/favorites/')
    //     .then(function(err, res) {
    //       expect(res).to.redirect('/favorites/all');
    //     })
    //     .catch(function (err) {
    //     });
    // });
  });
});