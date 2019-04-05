const adminModel = require('../models/admin');

function findUserbyId(id) {
    adminModel.findById(id, (err, admin) => {
        if (admin) return admin;
        else return {};
    })
};
module.exports = {
    login: (req, res, next) => {
        if (req.method == "GET") {
            if (req.isAuthenticated()) {
                res.redirect('/admin');
            }
            else {
                res.render('admin/login', {
                    title: 'Đăng nhập',
                });
            }
        }
        else if (req.method == "POST") {
            next();
        }
    },
    isLogged: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        }
        else res.redirect('/admin/login');
    },
    dashboard: (req,res)=>{
        if (req.method == "GET"){
            console.log("dashboard : "+req.user);
            res.render('admin/dashboard',{
                title:"Dashboard",
                admin: req.isAuthenticated() ? findUserbyId(req.user.admin) : {}
            })
        }
    }
}