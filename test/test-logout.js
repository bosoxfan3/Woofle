'use strict';

const {TEST_DATABASE_URL, PORT} = require('../config');
const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server.js');
const User = require('../server/user/user.model.js');
const expect = chai.expect;
const email = 'daniel@example.com';
const password = '12345678';
let Cookie = '';

chai.use(chaiHttp);

describe('Logout endpoint', function() {

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

  describe('/auth/logout', function() {
    it('Should remove the token when logging out', function() {
      return chai
        .request(app)
        .get('/auth/logout')
        .set('woofle-token', Cookie)
        .then(function(res) {
          expect(res).to.have.status(200);
          //200 instead of 302 since it technically gets /auth/login after
          //getting a 302 on /auth/logout
          expect(res).to.redirect;
          expect(res).to.not.have.cookie('woofle-token');
        })
        .catch(function(err) {
          console.log(err, 'error');
        });        
    }); 
  });
});