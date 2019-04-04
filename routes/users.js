const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userController = require('../controllers/users');
const userModel = require('../models/users');

router.use(session({ secret: "aaaaaaaaa" }));
router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res) => {
  res.send("Hello, you are in users/");
});

router.route('/login')
  .get(userController.login)
  .post(passport.authenticate('local', { failureRedirect: '/users/login', successRedirect: '/users' }));

router.route('/signup')
  .get(userController.signup)
  .post(userController.signup);

passport.use(new LocalStrategy(
  (username, password, done) => {
    userModel.findOne({ username: username })
      .then(user => {
        
        if (user) return done(null, user);
        else return done(null, false);
      })
      .catch(error => console.log("Error when find User , passport use localStrategy " + error));
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
