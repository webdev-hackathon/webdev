const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users');

require('../config/passport')();
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Trang chủ | Kỳ thi Hương Quốc Gia',
    isLogged: req.isAuthenticated(),
    user:req.user
  });
});

router.route('/login')
  .get(userController.login)
  .post(userController.login, passport.authenticate('local-login', { failureRedirect: '/users/login', successRedirect: '/users', failureFlash: true }));

router.route('/signup')
  .get(userController.signup)
  .post(userController.signup, passport.authenticate('local-signup', { failureRedirect: '/users/signup', successRedirect: '/users', failureFlash: true }));

router.get('/logout', userController.isLogged, userController.logout);
router.route('/choose-exam/')
  .get(userController.isLogged, userController.chooseExam);
router.get('/exam/:eid', userController.isLogged, userController.exam);
module.exports = router;
