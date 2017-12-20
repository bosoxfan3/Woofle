'use strict';

const {TEST_DATABASE_URL, PORT} = require('../config');
const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server.js');
const User = require('../server/user/user.model.js');
const expect = chai.expect;
const email = 'daniel@example.com';
const password = '12345678';

chai.use(chaiHttp);

describe('Login endpoint', function() {
  before(function () {
    return runServer(TEST_DATABASE_URL, PORT);
  });

  after(function() {
    return closeServer();
  });

  beforeEach(function() {
    return User.create({email, password});
  }); 
  
  afterEach(function() {
    return User.remove({email});
  });

  describe('/auth/login', function() {
    it('Should reject requests with no credentials', function() {
      return chai
        .request(app)
        .post('/auth/login')
        .then(function(res) {
          expect(res).to.have.status(401);
        })
        .catch(function(err) {
          //because 401 is an error, you don't want to console log these
          //errors since it will console log when it gets a 401
          //as intended
        });
    });
    it('Should reject requests with no password', function() {
      return chai
        .request(app)
        .post('/auth/login')
        .send({email})
        .then(function(res) {
          expect(res).to.have.status(401);
        })
        .catch(function(err) {
        });
    });
    it('Should reject requests with no email', function() {
      return chai
        .request(app)
        .post('/auth/login')
        .send({password})
        .then(function(res) {
          expect(res).to.have.status(401);
        })
        .catch(function(err) {
        });
    });
    it('Should reject incorrect email and passwords', function() {
      return chai
        .request(app)
        .post('/auth/login')
        .send({email: 'pingas@pingas.com', password: 'pingas'})
        .then(function(res) {
          expect(res).to.have.status(401);
        })
        .catch(function(err) {
        });
    });
    it('Should reject requests with incorrect emails', function() {
      return chai
        .request(app)
        .post('/auth/login')
        .send({email: 'pingas@pingas.com', password})
        .then(function(res) {
          expect(res).to.have.status(401);
        })
        .catch(function(err) {
        });
    });
    it('Should reject request with incorrect passwords', function() {
      return chai
        .request(app)
        .post('/auth/login')
        .send({email, password: 'password'})
        .then(function(res) {
          expect(res).to.have.status(401);
        })
        .catch(function(err) {
        });
    });
    it('Should allow requests with correct credentials', function() {
      return chai
        .request(app)
        .post('/auth/login')
        .send({email, password})
        .then(function(res) {
          expect(res).to.have.status(200);
        })
        .catch(function(err) {
          console.log(err, 'error');
        });
    });
    it('Should return a valid auth token', function() {
      return chai
        .request(app)
        .post('/auth/login')
        .send({email, password})
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.have.cookie('woofle-token');
        })
        .catch(function(err) {
          console.log(err, 'error');
        });
    });
  });
});