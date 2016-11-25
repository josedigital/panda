var express = require('express');
var router = express.Router();
var request = require('request-promise');

router.get('/resources/meetups/:tech', function(req, res, next) {

  request({
    uri: 'https://api.meetup.com/find/groups',
    qs: {
      'key': 'xxxxxxxxxxxxxxx',
      'sign': true,
      'photo-host': 'public',
      'zip': 78759,
      'country': 'usa',
      'filter': 'all',
      'location': 'austin',
      'text': req.params.tech,
      'radius': 50,
      'page': 20
    },
    json: true
  })
    .then( function (data) {
      res.render('resources', data);
    })
    .catch( function (error) {
      console.log(error);
      res.json(error);
    });

});

router.get('/resources/:tech', function(req, res, next) {
  res.render('');
});

router.get('/resources/:tech/:type', function(req, res, next) {
  res.render('');
});

module.exports = router;
