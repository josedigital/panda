var express = require('express');
var router = express.Router();
var request = require('request-promise');
var connectLogin = require('connect-ensure-login');
var models = require('../models');

var data = {};

router.get('/resources/meetups', connectLogin.ensureLoggedIn(), function (req, res, next) {
  // get user
  data.user = req.user;

  models.job_search.findAll({
  }).then(function (providers) {
    data.providers = providers;
  });

  res.render('meetups', data);
});

router.get('/resources/meetups/:tech', function(req, res, next) {
  data.user = req.user;

  models.job_search.findOne({where: {api_name: 'Meetups'} }).then(function (apiprovider) {
    console.log(apiprovider);
    console.log(apiprovider.search_params);
    var searchString = apiprovider.search_params;
    var queryString = JSON.parse(searchString);

    queryString.text = req.params.tech;

    request({
      uri: apiprovider.api_uri,
      qs: queryString,
      json: true
    })
      .then( function (muResults) {
        data.meetups = muResults;
        console.log(muResults);
        res.render('meetups', data);
      })
      .catch( function (error) {
        console.log(error);
        res.json(error);
      });

    });
    models.technology.findAll({
    }).then(function(tech){
      data.technology = tech;
    });
    // iterate over techs to display on nav
    for(t in data.technology) {
      console.log(data.technology[t].tech);
      data.technology[t].link = data.provider + '/' + data.technology[t].tech;
      console.log(data.technology[t].link);
    }
});

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
  models.library.findAll({
    include: [{
      model: models.technology,
      where: {tech:'JQUERY'}
    },{
      model: models.resource_type,
      where: {type:'VIDEO'}
    }]
  })
  .then(function(lib){
    return res.json(lib);
  })
})

module.exports = router;
