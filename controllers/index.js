var express = require('express');
var connectLogin = require('connect-ensure-login');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {user: req.user});
});

/* GET about page. */
router.get('/home', connectLogin.ensureLoggedIn(), function(req, res, next) {
  res.render('home', {user: req.user});
});

module.exports = router;
