'use strict';

const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejwt = require('express-jwt');
const mongoose = require('mongoose');
const {PORT, DATABASE_URL, JWT_SECRET_KEY} = require('./config');
const app = express();

mongoose.Promise = global.Promise;

const authRoutes = require('./server/auth/auth.route');
const breedRoutes = require('./server/breed/breed.route');
const favoritesRoutes = require('./server/favorites/favorites.route');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// UNPROTECTED ROUTES. DO NOT NEED TOKEN TO ACCESS
app.use(express.static('public'));
app.use('/auth', authRoutes);

// Authentication middleware provided by express-jwt. 
app.use(ejwt({
  secret: JWT_SECRET_KEY,
  getToken: function fromHeader (req) {
    return req.cookies['woofle-token'] || req.headers['woofle-token'];
  },
}));

// PROTECTED FROM NOW ON. 
app.use(express.static('public-secure'));
app.use('/breeds', breedRoutes);
app.use('/api/favorites', favoritesRoutes);

app.use('/', function(req, res, next) {
  // So when someone goes to root it redirects to landing page
  res.sendFile(path.resolve('public/index.html'));
});

//If we're about to 401, redirect to the landing page
//If user tries to signup with existing credentials, redirect to login
app.use(function(err, req, res, next) {
  if(401 == err.status) {
    console.log(err);
    return res.redirect('/');
  }
  if (11000 == err.code) {
    console.log(err);
    return res.redirect('/auth/login');
  }
  return res.status(500).json({message: 'Internal server error'});
});

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};