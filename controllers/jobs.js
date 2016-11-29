var express = require('express');
var router = express.Router();
var request = require('request-promise');
var connectLogin = require('connect-ensure-login');
var models = require('../models');

var data = {};



// connectLogin.ensureLoggedIn(), 
router.get('/jobs', connectLogin.ensureLoggedIn(), function (req, res, next) {
  // get user
  data.user = req.user;

  models.job_search.findAll({
  }).then(function (providers) {
    data.providers = providers;
    res.render('jobs', data);
  });

  
});


router.get('/jobs/:provider', connectLogin.ensureLoggedIn(), function (req, res, next) {
  data.user = req.user;
  data.provider = req.params.provider;
  // get techs from db
  models.technology.findAll({
  }).then(function(tech){
    data.technology = tech;

    // iterate over techs to display on nav
    for(t in data.technology) {
      console.log(data.technology[t].tech);
      data.technology[t].link = data.provider + '/' + data.technology[t].tech;
      console.log(data.technology[t].link);
    }
    res.render('jobs', data);

  });


});



router.get('/jobs/:provider/:tech', connectLogin.ensureLoggedIn(), function (req, res, next) {
  // get user
  data.user = req.user;

  // get techs from db
  models.technology.findAll({
  }).then(function(tech){
    data.technology = tech;

    // iterate over techs to display on nav
    // for(t in data.technology) {
    //   console.log(data.technology[t].tech);
    //   data.technology[t].link = data.provider + '/' + data.technology[t].tech;
    //   console.log(data.technology[t].link);
    // }

  });



  
  models.job_search.findOne({where: {api_name: req.params.provider} }).then(function (apiprovider) {

    var searchString = apiprovider.search_params;
    var queryString = JSON.parse(searchString);
    // add technology as search param
    queryString.skill = req.params.tech;
    queryString.q = req.params.tech;
    

  request({
    uri: apiprovider.api_uri,
    qs: queryString,
    json: true
  })
    .then( function (jobsResults) {
      data.jobs = jobsResults;
      console.log(jobsResults);
      res.render('jobs', data);
    })
    .catch( function (error) {
      console.log(error);
      res.json(error);
    });

  });


});







module.exports = router;
