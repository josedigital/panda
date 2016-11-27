var express = require('express');
var router = express.Router();
var request = require('request-promise');
var models = require('../models');


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

var data = {};
router.get('/resources/:tech', function(req, res, next) {
models.technology.findAll({
}).then(function(tech){
  data.tech = tech;
  // console.log(data.tech)
  res.render('resources', data);
  })
})


router.get('/resources/:tech/:type', function(req, res, next) {
 models.resource_type.findAll({
 }).then(function(resource){
   data.resource = resource;
 }).then(function(){
   models.technology.findAll({
}).then(function(tech){
  data.tech = tech;
  console.log(data.resource)
  res.render('resources', data);
  })
 })
})

module.exports = router;
