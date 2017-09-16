const User = require('./user.model')
const _ = require('lodash')

function addFavoriteBreed(req, res, next) {
  const email = req.user.email;
  const breedName = req.params.breedName;

  User.getByEmail(email)
    .then((user) => {
      user.favorites.push(breedName)
      user.favorites = _.uniq(user.favorites)
      return user.save()
    })
    .then((savedUser) => {
      console.log(savedUser)
      return res.json({
        message: 'Successfully added favorite',
        user: {
          email: savedUser.email,
          favorites: savedUser.favorites
        }
      })
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
}

function removeFavoriteBreed(req, res, next) {
  const email = req.user.email;
  const breedName = req.params.breedName;

  User.getByEmail(email)
    .then((user) => {
      const breedIndex = user.favorites.indexOf(breedName)
      if (breedIndex > -1) {
        user.favorites.splice(breedIndex, 1);
      }
      return user.save()
    })
    .then((savedUser) => {
      console.log(savedUser)
      return res.json({
        message: 'Successfully removed favorite',
        user: {
          email: savedUser.email,
          favorites: savedUser.favorites
        }
      })
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
}

function getProfile (req, res, next) {
  const userId = req.params.userId

  User.getById(userId)
    .then((user) => {
      return res.json({
        id: user.id,
        email: user.email,
        favorites: user.favorites
      })
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
}

module.exports = {
  addFavoriteBreed,
  removeFavoriteBreed,
  getProfile
};