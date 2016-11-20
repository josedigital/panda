var express = require('express');
var router = express.Router();
var request = require('request-promise');

router.get('/jobs', function(req, res, next) {
  request({
    uri: 'http://service.dice.com/api/rest/jobsearch/v1/simple.json',
    qs: {
      text: 'javascript', // req.params.city,
      city: 'Austin'
         // Use your accuweather API key here
    },
    json: true
  })
    .then( function (data) {
      res.render('jobs', data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
  
});

router.get('/jobs/:provider', function(req, res, next) {
  res.render('');
});

router.get('/jobs/:provider/:query', function(req, res, next) {
  res.render('');
});

module.exports = router;
