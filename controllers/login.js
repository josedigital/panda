var express = require('express');
var router = express.Router();
var passport = require('passport');
var models = require('../models');

var data = {};


// db.todo.create(body).then(function (todo) {
//     res.json(todo.toJSON());
//   }, function (e) {
//     res.status(400).json(e);
//   });


// Login
router.get('/login', function(req, res){
  res.render('login');
});

// login/github
router.get('/login/github', passport.authenticate('github'));


// login/github/return
router.get('/login/github/return', passport.authenticate('github', { failureRedirect: '/' }), function (req, res) {
  console.log(req.user);
    models.user.create({
      user_name: req.user.username,
      display_name: req.user.displayName,
      email: req.user._json.email,
      git_link:req.user.profileUrl,
      avitar_link: req.user._json.avatar_url
    }).then(function(user){
      data.user = user;
      res.redirect('/profile');
    });
    
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


module.exports = router;
