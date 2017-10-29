'use strict';

const _ = require('lodash');
const User = require('../user/user.model');
const path = require('path');

function all(req, res, next) {
  User.getByEmail(req.user.email)
    .then((user) => {
      res.json(user.favorites);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
}

function addFavorite(req, res, next) {
  var breedName = req.params.breedName;
  User.getByEmail(req.user.email)
    .then((user) => {
      user.favorites.push(breedName);
      user.favorites = _.uniq(user.favorites);
      return user.save();
    })
    .then((savedUser) => {
      return res.json(savedUser.favorites);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
}

function deleteFavorite(req, res, next) {
  var breedName = req.params.breedName;
  User.getByEmail(req.user.email)
    .then((user) => {
      const breedIndex = user.favorites.indexOf(breedName);
      if (breedIndex > -1) {
        user.favorites.splice(breedIndex, 1);
      }
      return user.save();
    })
    .then((savedUser) => {
      return res.json(savedUser.favorites);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
}

function showFavorites (req, res, next) {
  res.sendFile(path.resolve('public/favoritespage/favorites.html'));
}

module.exports = {
  all,
  addFavorite,
  deleteFavorite,
  showFavorites
};
