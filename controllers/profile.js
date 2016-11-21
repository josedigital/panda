var express = require('express');
var router = express.Router();
var connectLogin = require('connect-ensure-login');
var request = require('request-promise');

router.get('/profile', connectLogin.ensureLoggedIn(), function(req, res){
  req.user.img = req.user.photos[0].value;
  apiURI = 'https://api.github.com/users/' + req.user.username + 'repos';
  request({
    uri: apiURI,
    json: true
  })
    .then( function (data) {
      console.log(queryString);
      res.render('profile', { user: req.user, data });
    })
    .catch( function (error) {
      console.log(error);
      res.json(error);
    });
  
});

  


router.get('/profile/new', function(req, res, next) {
  res.render('');
});

router.get('/profile/edit/:id', function(req, res, next) {
  res.render('');
});

module.exports = router;
