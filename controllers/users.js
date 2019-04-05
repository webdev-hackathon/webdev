const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
module.exports = {
    login: (req, res, next) => {
        if (req.method == "GET") {
            if (req.isAuthenticated()) {
                res.redirect('/');
            }
            else
                res.render('pages/login', {
                    title: 'Đăng nhập',
                    message: req.flash(),
                    isLoggin: req.isAuthenticated()
                });
        }
        else if (req.method == "POST") {
            next();
        }
    },
    signup: (req, res, next) => {
        if (req.method == "GET") {
            if (req.isAuthenticated()) {
                res.redirect('/');
            }
            else res.render('pages/signup', { 
                title: 'Đăng ký tài khoản' ,
                isLoggin:req.isAuthenticated()
            });
        }
        else if (req.method == "POST") {
            // const salt = bcrypt.genSaltSync(10);
            // const passHash = bcrypt.hashSync(req.body.password, salt);
            // const user = {
            //     username: req.body.username,
            //     password: passHash,
            //     fullname: req.body.fullname,
            //     email: req.body.email,
            // }
            // userModel.create(user)
            //     .then(user => {
            //         console.log("Create user at Register controller " + user);
            //         res.redirect('/');
            //     })
            //     .catch(err => console.log(err));
            next();

        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    chooseExam: (req, res) => {
        if (req.method == "GET") {
            // lấy hết mã đề có trong DB đổ ra page
            const listExams = [
                {
                    eid: "125",
                    question: 40,
                },
                {
                    eid: "146",
                    question: 25,
                },
                {
                    eid: "345",
                    question: 40,
                },
                {
                    eid: "567",
                    question: 25,
                },
                {
                    eid: "128",
                    question: 40,
                },
                {
                    eid: "465",
                    question: 25,
                },
            ]
            res.render('pages/select-exam', {
                title: 'Chọn đề thi',
                isLoggin: req.isAuthenticated(),
                listExams: listExams
            });
        }
    },
    exam: (req, res) => {
        if (req.method == "GET") {
            const examId = req.params.eid; // mã đề 
            console.log("Choose exam code : " + examId);
            // query đề thi thông qua mã đề thi
            //return object chứa các câu hỏi của đề.
            const questions = [
                {
                    "q1": {
                        type: "Question",
                        question: "1+1=?",
                        options: {
                            a: "0",
                            b: "1",
                            c: "2",
                            d: "3",
                        }
                    },
                    "q2": {
                        type: "Image",
                        question: "Ảnh trên nói về vấn đề gì????",
                        options: {
                            a: "hình phong cảnh",
                            b: "con vật",
                            c: "hoạt động",
                            d: "something",
                        }
                    },
                }
            ]
            res.render('pages/exam', {
                title: 'Làm bài thi',
                isLoggin: req.isAuthenticated(),
                examQuestions: questions
            });
        }
    },
    isLoggin: (req, res, next) => {
        console.log("Req isAuth in userController/isLoggin : " + req.isAuthenticated());
        if (req.isAuthenticated()) {
            next();
        }
        else res.redirect('/users/login');
    }
}