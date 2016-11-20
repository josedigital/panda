var express = require('express');
var router = express.Router();

router.get('/jobs', function(req, res, next) {
  res.render('jobs');
});

router.get('/jobs/:provider', function(req, res, next) {
  res.render('');
});

router.get('/jobs/:provider/:query', function(req, res, next) {
  res.render('');
});

module.exports = router;
