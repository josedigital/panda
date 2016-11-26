var express = require('express');
var router = express.Router();
var connectLogin = require('connect-ensure-login');
var request = require('request-promise');
var github = require('octonode');

// var client = github.client();
// client.get('/users/josedigital', {}, function (err, status, body, headers) {
//   // console.log(body); //json object
// });

router.get('/profile', connectLogin.ensureLoggedIn(), function(req, res){
  var client = github.client(req.user.token);
  var ghuser = client.user(req.user.username);
  // console.log(ghuser);
  ghuser.repos(function(err, data, headers) {
    // console.log("error: " + err);
    // console.log(data);
    // console.log("headers:" + headers);
    res.render('profile', {user:req.user, repos: data});
  });
  
});

  


router.get('/profile/new', function(req, res, next) {
  res.render('');
});

router.get('/profile/edit/:id', function(req, res, next) {
  res.render('');
});

module.exports = router;
