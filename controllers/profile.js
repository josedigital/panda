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
  var repos = {};
  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      repos.username = req.user.username;
      repos.repo_name = key;
      repos.repo_url = req.body[key]; 
    }
    models.repos.create(repos).then(function (record) {
      console.log('created');
      console.log(record);

    });
  }
  res.redirect('/profile/'+req.user.username);  

});


router.get('/profile/:username', connectLogin.ensureLoggedIn(), function (req, res) {
  models.repos.findAll({ where: {username: req.user.username} }).then(function (records) {
    console.log(records.length);
    res.render('user-profile', {user:req.user, records: records,
      helpers: {
        lightDark: function (conditional, options) {
         if(conditional % 2 == 0) {
           return 'light';
         } else {
           return 'dark project-card--lower';
         }
            
        }
      }  
    });
  });
});


router.get('/profile/new', function(req, res, next) {
  res.render('');
});

router.get('/profile/edit/:id', function(req, res, next) {
  res.render('');
});

module.exports = router;
