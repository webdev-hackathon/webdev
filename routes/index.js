var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.isAuthenticated());
  res.render('index', { 
    title: 'Kỳ Thi Hương Quốc Gia' ,
    isLoggin: req.isAuthenticated()
  });
});

module.exports = router;
