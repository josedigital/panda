var express = require('express');
var router = express.Router();
var connectLogin = require('connect-ensure-login');
var request = require('request-promise');
var github = require('octonode');

var client = github.client();
// client.get('/users/josedigital', {}, function (err, status, body, headers) {
//   // console.log(body); //json object
// });

router.get('/profile', connectLogin.ensureLoggedIn(), function(req, res){
  // apiURI = 'https://api.github.com';
  // request({
  //   uri: apiURI,
  //   json: true
  // })
  //   .then( function (data) {
  //     console.log(queryString);
  //     res.render('profile', { user: req.user, data });
  //   })
  //   .catch( function (error) {
  //     console.log(error);
  //     res.json(error);
  //   });
  var ghuser = client.user(req.user);
  res.render('profile', ghuser);
});

  


router.get('/profile/new', function(req, res, next) {
  res.render('');
});

router.get('/profile/edit/:id', function(req, res, next) {
  res.render('');
});

module.exports = router;
