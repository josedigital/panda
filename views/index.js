var express = require('express');
var router = express.Router();
var data = require('../models/data.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', data);
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', data);
});

module.exports = router;
