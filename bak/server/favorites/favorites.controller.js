const _ = require('lodash')
const User = require('../user/user.model')

function all(req, res, next) {
    console.log("FAVORITES.ALL: for " + JSON.stringify(req.user));

    // TODO: load up User
    User.getByEmail(req.user.email)
      .then((user) => {
        res.json(user.favorites)
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
      });
    res.json(favorites);
}

//router.route('/favorites/:breedName')
function addFavorite(req, res, next) {
  var breedName = req.params.breedName;
  User.getByEmail(req.user.email)
    .then((user) => {
      user.favorites.push(breedName)
      user.favorites = _.uniq(user.favorites)
      return user.save()
    })
    .then((savedUser) => {
      return res.json(savedUser.favorites)
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
};

function deleteFavorite(req, res, next) {
  var breedName = req.params.breedName;
  User.getByEmail(req.user.email)
    .then((user) => {
      const breedIndex = user.favorites.indexOf(breedName)
      if (breedIndex > -1) {
        user.favorites.splice(breedIndex, 1);
      }
      return user.save()
    })
    .then((savedUser) => {
      return res.json(savedUser.favorites)
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
}

module.exports = {
  all,
  addFavorite,
  deleteFavorite
}
