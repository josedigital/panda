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

  ghuser.repos(1, 100, function(err, data, headers) {
    for(repo in data) {
      for(r in repos.savedRepos) {
        if(data[repo].name === repos.savedRepos[r].repo_name) {
          data[repo].checked = 'checked';
        } else if(repos.savedRepos.length >= 4) {
          data[repo].disabled = 'disabled';
        }
      }
    }
    // add repos to data object
    repos.ghRepos = data;
    res.render('profile', {user:req.user, repos: repos.ghRepos});
  });
});


router.post('/profile/add-repos', connectLogin.ensureLoggedIn(), function (req, res) {
  var repos ={};
  var repoNames = Object.keys(req.body);
  var i = 0;
  
  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      repos.username = req.user.username;
      repos.repo_name = key;
      repos.repo_url = req.body[key];
    }
  
      // if repos exist, update
      models.repos.findOrCreate({
        where: {
          repo_name: key,
          username: req.user.username,
          repo_url: req.body[key]
        }
      })
        .then(function(repoRow) {
          // run function after db save
          if(i >= repoNames.length) {
            reconcileRepos();
          }
        });
      i++;
    }
    // delete repos that were replaced
    var reconcileRepos = function () {
      models.repos.destroy({where: {
        username: req.user.username,
        repo_name: {
          $notIn: repoNames
        }
      }});
      res.redirect('/profile/'+req.user.username);
    };
  
});



// public profile page
router.get('/public/profile/:username', function (req, res) {
  var data = {};
  var client = github.client();
  var ghuser = '/users/'+req.params.username;

  
  // get the user info
  models.user.findOne({ where: {user_name: req.params.username} }).then(function(currentUser) {
    data.user = currentUser.dataValues;
  });
  // get the user's repos
  models.repos.findAll({ where: {username: req.params.username} }).then(function (records) {
    data.records = records;
    client.get(ghuser, {}, function (err, status, body, headers) {
      data.userinfo = body; //json object
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
router.post('/profile/save-profile', connectLogin.ensureLoggedIn(), function (req, res, next) {
  var textReceived = req.body.main_text;
  var descriptionIds = Object.keys(req.body);
  var userTitle = req.body.user_title;
  var data = {};

  models.user.findOne({ where: {user_name: req.user.username} }).then(function(user) {
    if(user) {
      user.update({ main_text: textReceived, user_title: userTitle }).then(function () {
        // res.send('Profile saved successfully: ' + textReceived);
        data.textReceived = textReceived;
        data.userTitle = userTitle;
      });
    }
  });


  for(repo in descriptionIds) {
    var recordId = descriptionIds[repo];

    models.repos.update(
        { repo_description: req.body[recordId] },
        { where: { id: recordId }}
      ).spread(function(affectedCount, affectedRows) {
        // return models.repos.findAll();
        console.log(affectedRows);
    }).then(function(singlerepo) {
      console.log(singlerepo);
    });

  }
  res.send('Profile saved successfully');
    
});



module.exports = router;
