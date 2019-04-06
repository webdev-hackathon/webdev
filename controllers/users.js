const userModel = require('../models/users');
const examModel = require('../models/exam');
const questionModel = require('../models/question');
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
                return res.redirect('/');
            }
            else{
                return res.render('pages/login', {
                    title: 'Đăng nhập',
                    message: req.flash(),
                    isLogged: req.isAuthenticated(),
                    user: req.isAuthenticated()?findUserbyId(req.user._id):{}
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
                user: req.isAuthenticated()?findUserbyId(req.user._id):{}
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
            examModel.find()
            .then(listExams=>{
                res.render('pages/select-exam', {
                    title: 'Chọn đề thi',
                    isLogged: req.isAuthenticated(),
                    listExams: listExams,
                    user: req.isAuthenticated()?(req.user):{}
                });
            })
        }
    },
    exam: (req, res) => {
        if (req.method == "GET") {
            const examId = req.params.eid; // mã đề 
            // query đề thi thông qua mã đề thi
            //return object chứa các câu hỏi của đề.
            questionModel.find({eid:examId})
            .then(listQuestions =>{
                if (listQuestions){
                    return res.render('pages/exam', {
                        title: 'Làm bài thi',
                        isLogged: req.isAuthenticated(),
                        listQuestions: listQuestions,
                        user: req.isAuthenticated()?req.user:{},
                        made:examId
                    });
                }
                else {
                    return res.redirect('/');
                }
               
            })
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
            return res.render('pages/exam', {
                title: 'Làm bài thi',
                isLogged: req.isAuthenticated(),
                examQuestions: questions,
                user: req.isAuthenticated()?req.user:{},
                made:examId
            });
        }
    },
    isLogged: (req, res, next) => {
        console.log("Req isAuth in userController/isLogged : " + req.isAuthenticated());
        if (req.isAuthenticated()) {
            next();
        }
        else return res.redirect('/users/login');
    }
}