var express = require('express');
var router = express.Router();
var data = require('../models/data.js');

router.get('/profile', function(req, res, next) {
  res.send('Hello world!');
});

router.get('/profile/new', function(req, res, next) {
  res.send('Test Message');
});

router.get('/profile/edit/:id', function(req, res, next) {
  res.render('');
});

module.exports = router;
