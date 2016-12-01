var express = require('express');
var router = express.Router();
var passport = require('passport');
var models = require('../models');

var data = {};

// Login
router.get('/login', function(req, res){
  res.render('login');
});

// login/github
router.get('/login/github', passport.authenticate('github'));


// login/github/return
router.get('/login/github/return', passport.authenticate('github', { failureRedirect: '/' }), function (req, res) {
  
    models.user.findOne({ where: {user_name: req.user.username} }).then(function(user) {
      if(user) {
        // redirect user to home page if user exists
        res.redirect('/home');
      } else {
        // otherwise, create user in db
        models.user.create({
          user_name: req.user.username,
          display_name: req.user.displayName,
          email: req.user._json.email,
          git_link:req.user.profileUrl,
          avitar_link: req.user._json.avatar_url
        }).then(function(user){
          console.log('created');
          data.user = user;
          res.redirect('/profile');
        });
      }
      
    });
    
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


module.exports = router;
