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
router.get('/resources', function(req,res,next){
    models.technology.findAll({
      }).then(function(tech){
      data.tech = tech;
    }).then(function(){
      models.resource_type.findAll({
    }).then(function(resources){
      data.resources = resources;
      res.render('resources', data);
    })
  })
})

router.get('/resources/:tech/:type', function(req, res, next) {
  // models.technology.findOne({where: {tech: 'JQUERY'}})
  // .then(function(tech){
  //   return tech.getLibraries()
  // }).then(function(){
  models.resource_type.findOne({where: {type: 'video'}})
  .then(function(type){
    return type.getLibraries()
    .then(function(libraries){
      return res.json(libraries);
    })
  })
})

module.exports = router;
