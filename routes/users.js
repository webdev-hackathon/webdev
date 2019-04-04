const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const flash = require('connect-flash');

const userController = require('../controllers/users');
const userModel = require('../models/users');

router.use(session({ secret: "aaaaaaaaa" }));
router.use(passport.initialize());
router.use(passport.session());
router.use(flash());

router.get('/', (req, res) => {
  res.send("Hello, you are in users/");
});

router.route('/login')
  .get(userController.login)
  .post(userController.login,passport.authenticate('local-login', { failureRedirect: '/users/login', successRedirect: '/users' }));

router.route('/signup')
  .get(userController.signup)
  .post(userController.signup);

passport.use('local-login',new LocalStrategy(
  {passReqToCallback:true},
  (req,username, password, done) => {
    userModel.findOne({ username: username })
      .then(user => {
        if (user) {
          const isMatch = bcrypt.compareSync(password,user.password);
          if (isMatch)
            done(null, user,req.flash('loginMsg','Login successfully'));
          else done(null,false,req.flash('loginMsg','Password is invalid'));
        } 
        else return done(null, false,req.flash('loginMsg','Username is invalid'));
      })
      .catch(error => {
        console.log("Error when find User , passport use localStrategy " + error);
        done(error);
    });
  }
))
passport.serializeUser((user, done) => {
  console.log("user in passport Local " + user);
  return done(null, user.id);
});
passport.deserializeUser((username, done) => {
  userModel.findOne({ username: username })
    .then(user => {
      if (user) return done(null, user);
      else return done(null, false);
    })
})
module.exports = router;
