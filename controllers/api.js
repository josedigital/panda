var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/api/v1/user/:id', function(req, res, next) {
  models.user.findOne({ where: {id: req.params.id} }).then(function(data) {
    if (data !== null){
      res.json(data);
    }else{
      res.status(404);
      res.send("No user with that id found");
    }
  });
});

router.get('/api/v1/users', function(req, res, next) {
  models.user.findAll().then(function(data) {
    res.json(data);
  });
});

router.get('/api/v1/resources', function(req, res, next) {
  models.library.findAll().then(function(data) {
    res.json(data);
  });
});

module.exports = router;
