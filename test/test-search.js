'use strict';

const {TEST_DATABASE_URL, PORT} = require('../config');
const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server.js');
const User = require('../server/user/user.model.js');
const expect = chai.expect;
const email = 'daniel@yahoo.com';
const password = '1234';
let Cookie;

chai.use(chaiHttp);

describe('Search endpoint', function() {

  before(function () {
    return runServer(TEST_DATABASE_URL, PORT);
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
            Cookie = res.headers['set-cookie'].pop().split(';')[0].substr(13);
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
        .get('/breeds/all')
        .set('woofle-token', Cookie)
        .then(function(res) {
          expect(res.body).to.be.an('array');
          expect(res).to.have.status(200);
          expect(res.body).to.have.lengthOf(121);
          expect(res.body[0]).to.have.property('value', 'Affenpinscher');
          expect(res.body[0]).to.have.property('inputText', 'Affenpinscher');
        })
        .catch(function(err) {
          console.log(err, 'error');
        });
    });
    it('should allow users to select a breed and search', function() {
      return chai
        .request(app)
        .get('/breeds/fetch/akita')
        .set('woofle-token', Cookie)
        .then(function(res) {
          expect(res.body).to.be.an('object');
          expect(res.body.imageUrls).to.be.an('array');
          expect(res.body.imageUrls).to.not.be.empty;
          expect(res.body.youTubeData).to.be.an('array');
          expect(res.body.youTubeData).to.not.be.empty;
        })
        .catch(function(err) {
          console.log(err, 'error');
        });
    });
    it('should go to my favorites page when my favorites button clicked', function() {
      return chai
        .request(app)
        .get('/favorites')
        //the route doesn't need a slash even though there is one in the router
        .set('woofle-token', Cookie)
        .then(function(res) {
          expect(res).to.have.status(200);
        })
        .catch(function(err) {
          console.log(err, 'error');
        });
    });
    it('should remove the token if the user clicks the logout button', function() {
      return chai
        .request(app)
        .get('/auth/logout')
        .set('woofle-token', Cookie)
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.redirect;
          expect(res).to.not.have.cookie('woofle-token');
        })
        .catch(function(err){
          console.log(err, 'error');
        }); 
    });
  });
});