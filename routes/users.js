const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const userController = require('../controllers/users');
const config = require('../config/config');



router.use(session({ secret: config.secret, resave: true }));
router.use(passport.initialize());
router.use(passport.session());
router.use(flash());
require('../config/passport')();
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Trang chủ | Kỳ thi Hương Quốc Gia',
    isLoggin: req.isAuthenticated()
  });
});

router.route('/login')
  .get(userController.login)
  .post(userController.login, passport.authenticate('local-login', { failureRedirect: '/users/login', successRedirect: '/users', failureFlash: true }));

router.route('/signup')
  .get(userController.signup)
  .post(userController.isLoggin, userController.signup, passport.authenticate('local-signup', { failureRedirect: '/users/signup', successRedirect: '/users', failureFlash: true }));

router.post('/logout', userController.isLoggin, userController.logout);
router.route('/choose-exam/')
  .get(userController.isLoggin, userController.chooseExam);
router.get('/exam/:eid', userController.isLoggin, userController.exam);
module.exports = router;
