const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
function findUserbyId(id){
   userModel.findById(id,(err,user)=>{
       if (user) return user;
       else return {};
   })
}
module.exports = {
    login: (req, res, next) => {
        if (req.method == "GET") {
            if (req.isAuthenticated()) {
                res.redirect('/');
            }
            else{
                res.render('pages/login', {
                    title: 'Đăng nhập',
                    message: req.flash(),
                    isLogged: req.isAuthenticated(),
                    user: req.isAuthenticated()?findUserbyId(req.user.id):{}
                });  
            }
                
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
                isLogged:req.isAuthenticated(),
                user: req.isAuthenticated()?findUserbyId(req.user.id):{}
            });
        }
        else if (req.method == "POST") {
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
                isLogged: req.isAuthenticated(),
                listExams: listExams,
                user: req.isAuthenticated()?findUserbyId(req.user.id):{}
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
                isLogged: req.isAuthenticated(),
                examQuestions: questions,
                user: req.isAuthenticated()?findUserbyId(req.user.id):{}
            });
        }
    },
    isLogged: (req, res, next) => {
        console.log("Req isAuth in userController/isLogged : " + req.isAuthenticated());
        if (req.isAuthenticated()) {
            next();
        }
        else res.redirect('/users/login');
    }
}