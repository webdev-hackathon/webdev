const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userModel = require('../models/users');

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
                    console.log("Error when find User , passport use localStrategy " + error);
                    done(error);
                });
        }
    ))
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        userModel.findById(id)
            .then(user => {
                if (user) done(null, user);
                else done(null, false);
            })
    })
}