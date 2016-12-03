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

  models.job_search.findAll({ where: {
    api_name:{ $ne: 'Meetups' }
  } }).then(function (providers) {
    data.providers = providers;
    // res.render('jobs', data);
    res.redirect('/jobs/Dice/html');
  });

  

  
});


router.get('/jobs/:provider', connectLogin.ensureLoggedIn(), function (req, res, next) {
  // get user
  data.user = req.user;
  // get provider from params
  data.provider = req.params.provider;
  // empty out jobs property
  data.jobs = '';
  console.log('---------');
  console.log(data.tech);
  console.log('---------');
  
  // get techs from db
  models.technology.findAll({
  }).then(function(tech){
    data.technology = tech;

    // iterate over techs to display on nav
    for(t in data.technology) {
      // console.log(data.technology[t].tech);
      data.technology[t].link = data.provider + '/' + data.technology[t].tech;
      // console.log(data.technology[t].link); 
    }

    // active tab
    for(p in data.providers) {
      if(data.providers[p].api_name === data.provider) {
        data.providers[p].active = 'active';
      } else {
        data.providers[p].active = '';
      }
    }    
    
    res.render('jobs', data);

  });


});



router.get('/jobs/:provider/:tech', connectLogin.ensureLoggedIn(), function (req, res, next) {
  // get user
  data.user = req.user;
  // get provider from params
  data.provider = req.params.provider;
  // get tech from params
  data.tech = req.params.tech;

  // get techs from db
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

  });

  // active tab
  for(p in data.providers) {
    if(data.providers[p].api_name === data.provider) {
      data.providers[p].active = 'active';
    } else {
      data.providers[p].active = '';
    }
  }





  
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
      res.render('jobs', data);
    })
    .catch( function (error) {
      console.log(error);
      res.json(error);
    });

  });


});







module.exports = router;
