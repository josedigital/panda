var express = require('express');
var router = express.Router();

router.get('/api/v1/user', function(req, res, next) {
  res.render('');
});

router.get('/api/v1/users', function(req, res, next) {
  res.render('');
});

router.get('/api/v1/resources', function(req, res, next) {
  res.render('');
});

module.exports = router;
