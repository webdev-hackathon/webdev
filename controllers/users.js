const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
module.exports = {
    login: (req, res,next) => {
        if (req.method == "GET"){
            res.render('login');
        }
        else if (req.method == "POST"){
            next();
        }
    },
    register: (req, res, next) => {
        if (req.method == "GET") {
            res.render('register');
        }
        else if (req.method == "POST") {
            const username = req.body.username;
            const password = req.body.password;
            userModel.create({username:username,password:password})
            .then(user=>{
                console.log("Create user at Register controller "+user);
                return res.send("Register ok");
            })
            .catch(err=>console.log(err));

        }
    }
}