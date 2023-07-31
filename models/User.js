const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//user schema for database
let userSchema = new Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;