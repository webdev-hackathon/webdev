const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
module.exports = {
    login: (req, res, next) => {
        if (req.method == "GET") {
            res.render('pages/login', { title: 'Đăng nhập' });
        }
        else if (req.method == "POST") {
            next();
        }
    },
    signup: (req, res, next) => {
        if (req.method == "GET") {
            res.render('pages/signup', { title: 'Đăng ký tài khoản' });
        }
        else if (req.method == "POST") {
            const salt = bcrypt.genSaltSync(10);
            const passHash = bcrypt.hashSync(req.body.password,salt);
            const user = {
                username: req.body.username,
                password: passHash,
                fullname: req.body.fullname,
                email: req.body.email,
            }
            userModel.create(user)
                .then(user => {
                    console.log("Create user at Register controller " + user);
                    res.redirect('/');
                })
                .catch(err => console.log(err));

        }
    }
}