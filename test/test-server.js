'use strict';

const {DATABASE_URL, PORT} = require('../config');
const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server.js');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Server', function() {

  before(function () {
    return runServer(DATABASE_URL, PORT);
  });

  after(function() {
    return closeServer();
  });

  describe('server', function(done) {
    it('should return status code 200', function (done) {
      chai.request(app)
        .get('/')
        .then(function(res) {
          expect(res).to.have.status(200);
          done();
        })
        .catch(function(err) {
          console.log(err, 'error');
        });
    });
  });
});