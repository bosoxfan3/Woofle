var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejwt = require('express-jwt')
const mongoose = require('mongoose');
const {PORT, DATABASE_URL, JWT_SECRET_KEY} = require('./config');

var app = express();

mongoose.Promise=global.Promise;

// var index = require('./routes/index');
//var favorites = require('./routes/favorites');
// var breeds = require('./routes/breeds');

const authRoutes = require('./server/auth/auth.route')
const userRoutes = require('./server/user/user.route');
const breedRoutes = require('./server/breed/breed.route')
const favoritesRoutes = require('./server/favorites/favorites.route');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('public', {
   extensions: ['html']
}));

// Authentication middleware provided by express-jwt. If it succeeds, it sets req.user.
app.use(ejwt({
   secret: JWT_SECRET_KEY,
   getToken: function fromHeader (req) {
       return req.cookies['woofle-token'];
     },

 }).unless({path: ['/auth/login', '/auth/signup']}));

app.use('/auth', authRoutes)
app.use('/users', userRoutes);
app.use('/breeds', breedRoutes);
//console.log(favoritesRoutes);
app.use('/api/favorites', favoritesRoutes);

app.use('/search', function(req, res, next) {
  // Return the main index page content
  res.sendFile(path.resolve('public/breedSearch.html'));
});

// Middleware to log each request and cookies. Useful while we develop.
app.use(function(req, res, next) {
  console.log("Handling request: " + req.url);
  console.log("Cookies: " + JSON.stringify(req.cookies));
  next();
})

// Simple middleware so we can see what req.user is on each request while we develop.
app.use(function(req, res, next) {
  var user = req.user;
  console.log("current user is: " + JSON.stringify(req.user));
  next();
});

// If we're about to 401, redirect to the login page
app.use(function(err, req, res, next) {
  if(401 == err.status) {
      res.redirect('/auth/login')
  }
});

//------------------------------------------------------------------------------

// app.use('/breeds', breeds);
// app.use('/breeds2', breedRoutes);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
// app.use(function(err, req, res, next) {
//   console.log(err)
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

let server;

// this function connects to our database, then starts the server
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

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
