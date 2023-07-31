var createError = require('http-errors');
const express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

//setting routes
var indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const snippetRouter = require('./routes/snippet');
const commentRouter = require('./routes/comment');

var app = express();

//mongoDB connection
const mongoDB = "mongodb://127.0.0.1:27017/testdb";
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/build')));


//auth setup for session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));


//routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', snippetRouter); 
app.use('/api', commentRouter); 

//route setup for react
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  //set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
   //render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*
const port = process.env.PORT || 3001; // Use a different port for the backend, such as 3001
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
*/

module.exports = app;
