const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userModel = require('../models/users');
const adminModel = require('../models/admin');
module.exports = () => {
    passport.use('local-login', new LocalStrategy(
        { passReqToCallback: true },
        (req, username, password, done) => {
            userModel.findOne({ username: username })
                .then(user => {
                    if (user) {
                        const isMatch = bcrypt.compareSync(password, user.password);
                        if (isMatch)
                            done(null, user);
                        else done(null, false, req.flash('loginMsg', 'Password is invalid'));
                    }
                    else done(null, false, req.flash('loginMsg', 'Username is invalid'));
                })
                .catch(error => {
                    done(error);
                });
        }
    ));
    passport.use('local-signup', new LocalStrategy(
        { passReqToCallback: true },
        (req, username, password, done) => {
            userModel.findOne({ username: username })
                .then(user => {
                    if (user) done(null, false, req.flash('signupMsg', 'Username has been existed'));
                    else {
                        const salt = bcrypt.genSaltSync(10);
                        const passHash = bcrypt.hashSync(password, salt)
                        const newUserData = {
                            username: username,
                            password: passHash,
                            email: req.body.email,
                            fullname: req.body.fullname
                        }
                        userModel.create(newUserData)
                            .then(newUser => {
                                console.log("user created :" + newUser);
                                if (newUser) done(null, newUser, req.flash('signupMsg', 'Signup successs'));
                                else done(null, false);
                            })
                            .catch(err => {
                                console.log('error at passport.js/local-signup' + err);
                                done(err);
                            });
                    }
                })
        }));
    passport.use('local-login-admin', new LocalStrategy(
        { passReqToCallback: true },
        (req, username, password, done) => {
            adminModel.findOne({ admin: username })
                .then(admin => {

                    if (admin) {
                        const isMatch = bcrypt.compareSync(password, admin.password);
                        if (isMatch) {
                            done(null, admin);
                            console.log("Is authenticated? passport "+req.isAuthenticated());
                        }
                        else done(null, false, req.flash('loginMsg', 'Password is invalid'));
                    }
                    else done(null, false, req.flash('loginMsg', 'Username is invalid'));
                })
                .catch(error => {
                    done(error);
                });
        }
    ));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        userModel.findById(id)
            .then(user => {
                if (user) done(null, user);
                else return adminModel.findById(id);
            })
            .then(admin=>{
                if (admin) done(null,admin);
                else done(null,false);
            })
            .catch(err => {throw err});
    });

}