// Middleware to check if the user is authenticated and session data has been populated
const checkForLogin = (req, res, next) => {
  console.log(req.session.userId)
  if (req.session.userId) {
    next();
  }else{
    return res.status(401).json('Authentication required');
  }
};
  
  module.exports = { checkForLogin };
  