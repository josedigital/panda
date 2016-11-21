var express = require('express');
var router = express.Router();
var passport = require('passport');
var connectLogin = require('connect-ensure-login');


// Login
router.get('/login', function(req, res){
  res.render('login');
});

// login/github
router.get('/login/github', passport.authenticate('github'));


// login/github/return
router.get('/login/github/return', passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});


router.get('/profile', connectLogin.ensureLoggedIn(), function(req, res){
  req.user.img = req.user.photos[0].value;
  res.render('profile', { user: req.user });
});

module.exports = router;
