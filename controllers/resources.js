var express = require('express');
var router = express.Router();
var request = require('request-promise');
var connectLogin = require('connect-ensure-login');
var models = require('../models');

var data = {};

router.get('/resources', connectLogin.ensureLoggedIn(), function(req,res,next){
    data.user = req.user;
    models.technology.findAll({
      }).then(function(tech){
      data.tech = tech;
    }).then(function(){
      models.resource_type.findAll({
    }).then(function(resources){
      data.resources = resources;
      res.render('resources', data);
    });
  });
});

// router.get('/resources/:tech/:type', connectLogin.ensureLoggedIn(), function(req, res, next) {
//   // models.technology.findOne({where: {tech: 'JQUERY'}})
//   // .then(function(tech){
//   //   return tech.getLibraries()
//   // }).then(function(){
//   models.library.findAll({
//     include: [{
//       model: models.technology,
//       where: {tech:'JQUERY'}
//     },{
//       model: models.resource_type,
//       where: {type:'VIDEO'}
//     }]
//   })
//   .then(function(lib){
//     return res.json(lib);
//   });
// });



router.get('/resources/meetups', connectLogin.ensureLoggedIn(), function (req, res, next) {
  res.redirect('/resources/meetups/html');
});

router.get('/resources/meetups/:tech', connectLogin.ensureLoggedIn(), function(req, res, next) {
  // get user
  data.user = req.user;
  data.noresults = req.params.tech;

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
          res.render('meetups', data);
        });
        
      })
      .catch( function (error) {
        console.log(error);
        res.json(error);
      });

    });

});



module.exports = router;
