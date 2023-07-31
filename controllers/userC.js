const bcrypt = require('bcrypt');
const User = require('../models/User');

// user registration
async function registerUser(req, res) {
  const { username, password } = req.body;

  //check user and pass fields not empty
  if (username.length < 1 || password.length < 1){
    return res.status(400).json('Please enter both fields');
  }

  //check if username is in the database
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    //save new user and inform 
    await newUser.save();
    return res.status(201).json('User registered successfully');
  } catch (error) {
    return res.status(500).json(error);
  }
}

//user login
async function loginUser(req, res) {
  const { username, password } = req.body;

  //user from the database if exists
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json('User not found');
    }

    //compare passwords with bcrypt method
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json('Invalid password');
    }
    
    //save user information on session data for use
    req.session.userId = user._id;
    req.session.username = user.username;
    return res.status(200).json('Login successful');
  } catch (error) {
    return res.status(500).json('Something went wrong');
  }
}

module.exports = { registerUser, loginUser };