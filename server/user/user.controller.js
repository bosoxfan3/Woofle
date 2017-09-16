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

module.exports = {
  addFavoriteBreed
};