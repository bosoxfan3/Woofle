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

const email = 'daniel@gmail.com';
const password = '1234';

let Cookie;

describe('Favorites endpoint', function() {

  before(function () {
    return runServer(DATABASE_URL, PORT);
  });

  after(function() {
    return closeServer();
  });

  beforeEach(function(done) {
    User.getByEmail('daniel@gmail.com')
      .then(function(user) {
        chai.request(app)
          .post('/auth/login')
          .send({email: user.email, password: user.password})
          .end(function(err, res) {
            Cookie = res.headers['set-cookie'].pop().split(';')[0].substr(13);
            done();
          });
      });
  }); 

  afterEach(function(done) {
    User.getByEmail('daniel@gmail.com')
      .then(function(user) {
        chai.request(app)
          .post('/api/favorites/eskimo')
          .set('woofle-token', Cookie)
          .end(function(err, res) {
            done();
          });
      });
  });

  describe('Favorites page', function() {
    it('should display the user\'s favorites', function() {
      return chai
        .request(app)
        .get('/api/favorites/all')
        .set('woofle-token', Cookie)
        .then(function(res) {
          expect(res.body).to.be.an('array');
          expect(res).to.have.status(200);
          expect(res.body).to.have.lengthOf(1);
          
        })
        .catch(function (err) {
          console.log(err, 'error');
        });
    });
    it('should remove a favorite if corresponding button is clicked', function() {
      return chai
        .request(app)
        .delete('/api/favorites/eskimo')
        .set('woofle-token', Cookie)
        .then(function(res) {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(0);
          expect(res).to.have.status(200);
        })
        .catch(function (err) {
        });
    });


    it('should go to my favorites page when the search button is clicked', function() {
      return chai
        .request(app)
        .get('/search')
        //the route doesn't need a slash even though there is one in the router
        .set('woofle-token', Cookie)
        .then(function(err, res) {
          expect(res).to.have.status(200);
          expect(res).to.redirectTo('/search');
        })
        .catch(function (err) {
        });
    });
    it('should remove the token if the user clicks the logout button', function() {
      return chai
        .request(app)
        .get('/auth/logout')
        .set('woofle-token', Cookie)
        .then(function(err, res) {
          expect(res).to.have.status(302);
          expect(res).to.redirectTo('/auth/login');
          expect(res).to.not.have.cookie('woofle-token');
        })
        .catch(function (err){
        }); 
    });
  });
});