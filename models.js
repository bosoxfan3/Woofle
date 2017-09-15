const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  favorites: Array,
});

const User = mongoose.model('User', userSchema);

User.plugin(passportLocalMongoose);

module.exports = {User};