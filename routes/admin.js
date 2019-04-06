const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const adminModel = require('../models/admin');
const adminController = require('../controllers/admin');
require('../config/passport')();

router.route('/login')
    .get(adminController.login)
    .post(adminController.login, passport.authenticate('local-login-admin', { failureRedirect: '/admin/login', successRedirect: '/admin', failureFlash: true }))

// router.get('/dashboard', adminController.dashboard);
router.get('/', adminController.isLogged, adminController.dashboard);
router.route('/addExam')
    .get(adminController.isLogged, adminController.addExam);
router.route('/addQuestion/:eid&:qtyQuestion')
    .get(adminController.isLogged, adminController.addQuestion);

// do not uncomment ,only use for create admin account
// router.route('/signup')
//     .get((req,res)=>{
//         res.render('admin/signup');
//     })
//     .post((req,res)=>{
//         console.log(req.body.password);
//         const salt = bcrypt.genSaltSync(10);
//         const passHash = bcrypt.hashSync(req.body.password,salt);
//         const adminData = {
//             admin:req.body.username,
//             password:passHash
//         }
//         adminModel.create(adminData,(err,admin)=>{
//             if (err) console.log(err);
//             else
//                 console.log(admin + " is created");
//             res.redirect('/admin/signup');
//         });
//     })

module.exports = router;