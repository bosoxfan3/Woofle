'use strict';

const {DATABASE_URL, PORT} = require('../config');
const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server.js');
const User = require('../server/user/user.model.js');
const expect = chai.expect;
let Cookie;

chai.use(chaiHttp);

describe('Favorites endpoint', function() {

  before(function () {
    
    return runServer(DATABASE_URL, PORT);
  });

  after(function() {
    return closeServer();
  });

  beforeEach(function(done) {
    User.getUserByEmail('daniel@gmail.com')
      .then(function(user) {
        console.log(user, 'user before each')
        chai.request(app)
          .post('/auth/login')
          .send({email: user.email, password: user.password})
          .end(function(err, res) {
            Cookie = res.headers['set-cookie'].pop().split(';')[0].substr(13);
            done();
          });
      })
      .catch(function(err) {
        console.log(err, 'error before each');
      });
  }); 

  afterEach(function(done) {
    // this.timeout(10000);
    User.getUserByEmail('daniel@gmail.com')
      .then(function(user) {
        console.log(user, 'user after each')
        chai.request(app)
          .post('/api/favorites/eskimo')
          .set('woofle-token', Cookie)
          .end(function(err, res) {
            done();
          });
      })
      .catch(function(err) {
        console.log(err, 'error after each');
      });
  });

  describe('Favorites page', function() {
    it('should go to search page when the search button is clicked', function() {
      return chai
        .request(app)
        .get('/search')
        //the route doesn't need a slash even though there is one in the router
        .set('woofle-token', Cookie)
        .then(function(res) {
          expect(res).to.have.status(200);
        })
        .catch(function(err) {
          console.log(err, 'error');
        });
    });
    it('should go to the specific breed\'s page if that button is clicked', function() {
      return chai
        .request(app)
        .get('/breeds/search/eskimo')
        .set('woofle-token', Cookie)
        .then(function(res) {
          expect(res).to.have.status(200);
        })
        .catch(function(err) {
          console.log(err, 'error');
        });
    });
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
        .catch(function(err) {
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
        .catch(function(err) {
          console.log(err, 'error');
        });
    });
  });
});