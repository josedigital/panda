var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/api/v1', function (req, res, next) {
  res.render('api');
});

router.get('/api/v1/users/:id', function(req, res, next) {
  console.log('------ the id is ===== ' + req.params.id);
  models.user.findOne({ where: {id: req.params.id} }).then(function(data) {
    if (data !== null){
      res.json(data);
    }else{
      res.status(404);
      res.json({'error': 'No user with that id found'});
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


router.get('/api/v1/resources/:tech', function(req, res, next) {

  var data = {};
  data.tech = req.params.tech;

  models.technology.findAll({
    }).then(function(tech){
  }).then(function(){
    models.resource_type.findAll({
  }).then(function(resources){

    models.library.findAll({
      include: [{
        model: models.technology,
        where: {tech: data.tech}
      }]
    }).then(function(libraries){
        data.libraries = libraries;
        res.json(data);
      });
    });
  });

});




router.get('/api/v1/resources/:tech/:type', function(req, res, next) {
  var technology = req.params.tech;
  var resourceType = req.params.type;
  models.library.findAll({
    include: [{
      model: models.technology,
      where: {tech:technology}
    },{
      model: models.resource_type,
      where: {type:resourceType}
    }]
  })
  .then(function(lib){
    return res.json(lib);
  });
});

module.exports = router;
