var express = require('express');
var router = express.Router();
var data = require('../models/data.js');

router.get('/admin', function(req, res, next) {
  res.render('');
});

router.get('/admin/add/:target', function(req, res, next) {
  res.render('');
});

router.get('/admin/update/:target/:resource_id', function(req, res, next) {
  res.render('');
});

module.exports = router;
