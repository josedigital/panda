var express = require('express');
var router = express.Router();
var data = require('../models/data.js');

router.get('/jobs', function(req, res, next) {
  res.render('');
});

router.get('/jobs/:provider', function(req, res, next) {
  res.render('');
});

router.get('/jobs/:provider/:query', function(req, res, next) {
  res.render('');
});

module.exports = router;
