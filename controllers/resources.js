var express = require('express');
var router = express.Router();

router.get('/resources', function(req, res, next) {
  res.render('');
});

router.get('/resources/:tech', function(req, res, next) {
  res.render('');
});

router.get('/resources/:tech/:type', function(req, res, next) {
  res.render('');
});

module.exports = router;
