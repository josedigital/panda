var express = require('express');
var router = express.Router();
var passport = require('passport');


// Login
router.get('/login', function(req, res){
  res.render('login');
});

// login/github
router.get('/login/github', passport.authenticate('github'));


// login/github/return
router.get('/login/github/return', passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile');
});


module.exports = router;
