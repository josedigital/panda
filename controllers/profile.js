var express = require('express');
var router = express.Router();
var connectLogin = require('connect-ensure-login');
var request = require('request-promise');
var github = require('octonode');
var models = require('../models');


router.get('/profile', connectLogin.ensureLoggedIn(), function(req, res){
  var repos = {};
  var client = github.client(req.user.token);
  var ghuser = client.user(req.user.username);

  models.repos.findAll({ where: {username: req.user.username} }).then(function (records) {
    if(records.length > 0) {
      repos.savedRepos = records;
    }
  });

  ghuser.repos(function(err, data, headers) {
    for(repo in data) {
      for(r in repos.savedRepos) {
        if(data[repo].name === repos.savedRepos[r].repo_name) {
          data[repo].checked = 'checked';
        } else if(repos.savedRepos.length === 4) {
          data[repo].disabled = 'disabled';
        }
      }
      console.log(data[repo].checked);
      console.log(data[repo].disabled);
    }
    // add repos to data object
    repos.ghRepos = data;
    res.render('profile', {user:req.user, repos: repos.ghRepos});
  });
});


router.post('/profile/add-repos', function (req, res) {
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


// public profile page
router.get('/public/profile/:username', function (req, res) {
  var data = {};
  // get the user info
  models.user.findOne({ where: {user_name: req.params.username} }).then(function(currentUser) {
    data.user = currentUser.dataValues;
  });
  // get the user's repos
  models.repos.findAll({ where: {username: req.params.username} }).then(function (records) {
    data.records = records;
    res.render('public-profile', {data,
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
// redirect if no username provided
router.get('/public/profile', function (req, res) {
  res.redirect('/');
});



// private editable profile page
router.get('/profile/:username', connectLogin.ensureLoggedIn(), function (req, res) {
  models.user.findOne({ where: {user_name: req.user.username} }).then(function(currentUser) {
    req.user.currentUser = currentUser;
  });
  models.repos.findAll({ where: {username: req.user.username} }).then(function (records) {
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


// post for edit-in-place sections of public profile
router.post('/profile/save-profile', function (req, res, next) {
  var textReceived = req.body.main_text;
  var descriptionIds = Object.keys(req.body);

  models.user.findOne({ where: {user_name: req.user.username} }).then(function(user) {
    if(user) {
      user.update({ main_text: textReceived }).then(function () {
        res.send('Profile saved successfully: ' + textReceived);
      });
    }
  });

  for(repo in descriptionIds) {
    var recordId = descriptionIds[repo];
    models.repos.findById(recordId).then(function (repo) {
      repo.update({ repo_description: req.body[recordId] }).then(function () {
        res.send('Repos description saved successfully: ' + req.body[recordId]);
      });
    });
  }


    
});


router.get('/profile/new', function(req, res, next) {
  res.render('');
});

router.get('/profile/edit/:id', function(req, res, next) {
  res.render('');
});

module.exports = router;
