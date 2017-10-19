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

const email = 'daniel@example.com';
const password = '12345678';

describe('Logout endpoint', function() {

  before(function () {
    return runServer(DATABASE_URL, PORT);
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

  describe('/auth/logout', function() {
    it('Should remove the token when logging out', function() {
      return chai
        .request(app)
        .get('/auth/logout')
        .then(function(err, res) {
          expect(res).to.have.status(302);
          expect(res).to.redirect('/auth/login');
          expect(res).to.not.have.cookie('woofle-token');
        })
        .catch(function (err) {
        });        
    }); 
  });
});