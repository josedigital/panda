var express = require('express');
var router = express.Router();
var request = require('request-promise');
var connectLogin = require('connect-ensure-login');
var models = require('../models');

router.get('/resources/meetups', connectLogin.ensureLoggedIn(), function (req, res, next) {
  res.redirect('/resources/meetups/html');
});

router.get('/resources/meetups/:tech', connectLogin.ensureLoggedIn(), function(req, res, next) {
  var data = {};
  // get user
  data.user = req.user;
  data.tech = req.params.tech;

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

        models.technology.findAll({
        }).then(function(tech){
          data.technology = tech;
          // active tech
          for(i in data.technology) {
            if(data.technology[i].tech === data.tech) {
              data.technology[i].active = 'active';
            } else {
              data.technology[i].active = 'non-active';
            }
          }

          
          res.render('meetups', data);
        });

      })
      .catch( function (error) {
        console.log(error);
        res.json(error);
      });

    });

});



router.get('/resources', connectLogin.ensureLoggedIn(), function(req,res,next){

    var data = {};
    data.user = req.user;
    data.intro = "Welcome to the resources page. To the left you find the list of technologies. Please select a topic you would like learn more about!";

    models.technology.findAll({
      }).then(function(tech){
      data.technology = tech;
    }).then(function(){

      for(var t in data.technology) {

            data.technology[t].link = 'resources/' + data.technology[t].tech;

          }

          res.render('resources', data);
    });
});

// THIS ROUTE IS CURRENTLY NOT BEING USED
// **************************************
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
  });
});

router.get('/resources/:tech', function(req, res, next) {

  var data = {};
  data.user = req.user;
  data.tech = req.params.tech;

  models.technology.findAll({
    }).then(function(tech){
    data.technology = tech;
  }).then(function(){
    models.resource_type.findAll({
  }).then(function(resources){
    data.resources = resources;

    for(var r in data.resources) {

      data.resources[r].link = data.tech + "/" + data.resources[r].type;

    }

    models.library.findAll({
      include: [{
        model: models.technology,
        where: {tech: data.tech}
      }]
    }).then(function(libraries){

      data.libraries = libraries;
      console.log(data);
      res.send(data);

    });

    });
  });
  // models.library.findAll({
  //   include: [{
  //     model: models.resource_type,
  //     where: {type: data.tech}
  //   }]
  // })
  // .then(function(lib){
  //   res.render('resources', lib);
  // });
});

module.exports = router;
