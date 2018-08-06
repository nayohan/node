var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {iframe_link: 'https://www.daum.net'});
});

router.post('/', function(req, res){
   var link = req.body.link;
   res.render('index', {iframe_link: link});
   
});

module.exports = router;
