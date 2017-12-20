'use strict';

const {TEST_DATABASE_URL, PORT} = require('../config');
const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server.js');
const User = require('../server/user/user.model.js');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Signup endpoint', function() {
  
  before(function () {
    return runServer(TEST_DATABASE_URL, PORT);
  });
  
  after(function() {
    return closeServer();
  });
    
  beforeEach(function() {
    return User.remove({}).then(() => User.create({email: 'daniel@gmail.com', password: '1234'}));
  });

  describe('/auth/signup', function() {
    it('Should not allow signup with no credentials', function() {
      return chai
        .request(app)
        .post('/auth/signup')
        .then(function(res) {
          expect(res).to.have.status(400);
        })
        .catch(function(err) {
        });
    });
    it('Should not allow signup with no password', function() {
      return chai
        .request(app)
        .post('/auth/signup')
        .send({email: 'pingas@pingas.com'})
        .then(function(res) {
          expect(res).to.have.status(400);
        })
        .catch(function(err) {
        });
    });
    it('Should not allow signup with no email', function() {
      return chai
        .request(app)
        .post('/auth/signup')
        .send({password: 'pingas'})
        .then(function(res) {
          expect(res).to.have.status(400);
        })
        .catch(function(err) {
        });
    });
    it('Should not allow signup with duplicate email', function() {
      return chai
        .request(app)
        .post('/auth/signup')
        .send({email: 'daniel@gmail.com', password: '12345678'})
        .then(function(res) {
          expect(res).to.have.status(400);
        })
        .catch(function(err) {
        });
    });
    it('Should allow signup with unique email', function() {
      return chai
        .request(app)
        .post('/auth/signup')
        .send({email: 'pingas@pingas.com', password: '1234'})
        .then(function(res) {
          expect(res).to.have.status(200);
          //not 201 or 302 here because although user is created and then found, they are then redirected
          //to /auth/login which makes the res ultimately a 200
          expect(res).to.redirect;
        })
        .catch(function(err) {
        });
    });
  });
});  