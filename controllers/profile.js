var express = require('express');
var router = express.Router();
var connectLogin = require('connect-ensure-login');
var request = require('request-promise');
var github = require('octonode');
var models = require('../models');


router.get('/profile', connectLogin.ensureLoggedIn(), function(req, res){
  var client = github.client(req.user.token);
  var ghuser = client.user(req.user.username);
  // console.log(ghuser);
  ghuser.repos(function(err, data, headers) {
    // console.log("error: " + err);
    // console.log(data);
    // console.log("headers:" + headers);
    // res.json(data);
    res.render('profile', {user:req.user, repos: data});
  });
  
});


router.post('/profile/add-repos', function (req, res) {
  // req.body = { 
  //   'Fluid-for-Sketch': 'https://github.com/josedigital/Fluid-for-Sketch',
  //   formToWizard: 'https://github.com/josedigital/formToWizard',
  //   'free-programming-books': 'https://github.com/josedigital/free-programming-books' 
  // }
  // var repos = {};
  // for (var key in req.body) {
  //   if (req.body.hasOwnProperty(key)) {
  //     repos.git_repo1  = 
  //   }
  // }
  
  console.log(req.body);
  res.json(req.body);
  // var record = models.user.findOne({ where: {user_name: req.user.username} });
  // record.update({
  //   git_repo1: 
  // }).then(function (record) {
  //   console.log(record);
  // });
});
  


router.get('/profile/new', function(req, res, next) {
  res.render('');
});

router.get('/profile/edit/:id', function(req, res, next) {
  res.render('');
});

module.exports = router;
