const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userC');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//  user registration
router.post('/register', registerUser);

// user login
router.post('/login', loginUser);

module.exports = router;