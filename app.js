const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

const routes = require('./routes');
const config = require('./config');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// connect db
mongoose.connect(config.uri,{useNewUrlParser:true},(err,db)=>{
  if (!err) console.log("Connected with MongoDB");
  else throw new "Error when connect db";
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/components', express.static(path.join(__dirname, 'bower_components')));

app.use(express.static(path.join(__dirname, 'public')));

// app route
app.use('',routes.indexRoute);
app.use('/users',routes.userRoute);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
