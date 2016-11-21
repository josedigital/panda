var express = require('express');
var router = express.Router();
var request = require('request-promise');

router.get('/jobs', function (req, res, next) {
  res.render('jobs');
});

router.get('/jobs/:provider', function (req, res, next) {
  var data = {
    // 'tech': ['html','css','jquery','javascript','react']
    'tech': [
      {
        'technology': 'html'
      },
      {
        'technology': 'css'
      },
      {
        'technology': 'javascript'
      },
      {
        'technology': 'react'
      }
    ]
  };
  data.provider = req.params.provider;
  res.render('jobs', data);
});

var apiProvider;
var queryString;
router.get('/jobs/:provider/:tech', function (req, res, next) {
  var provider = req.params.provider;
  switch (provider) {
    case 'dice':
      apiProvider = 'http://service.dice.com/api/rest/jobsearch/v1/simple.json';
      queryString = {
        city: 'Austin,+TX',
        text: 'junior',
        skill: req.params.tech
      }
      break;
    case 'muse':
      apiProvider = 'https://api-v2.themuse.com/jobs';
      queryString = {
        api_key: '',
        category: 'Engineering',
        level: 'Entry+Level+Mid+Level',
        location: 'Austin, TX',
        page:1
      }
      break;
    case 'indeed':
      apiProvider = 'http://api.indeed.com/ads/apisearch';
      queryString = {
        publisher: '',
        v: 2,
        format: 'json',
        q: req.params.tech,
        as_any: 'junior',
        l: 'Austin, TX',
        radius: 100
      }
    default:
      break;
  }

  request({
    uri: apiProvider,
    qs: queryString,
    json: true
  })
    .then( function (data) {
      console.log(queryString);
      res.render('jobs', data);
    })
    .catch( function (error) {
      console.log(error);
      res.json(error);
    });
  
});







module.exports = router;
