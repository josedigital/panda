var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/admin', function(req, res, next) {
  res.render('admin');
});

router.get('/admin/add/:target', function(req, res, next) {
  res.render('');
});

router.get('/admin/update/:target/:resource_id', function(req, res, next) {
  res.render('');
});

router.get('/admin/test', function(req,res, next){
  models.technology.findAll({
    attributes: ['tech']
  }) .then(function(data){
    // console.log(data[0].dataValues.tech);
    var techObject = [];
    data.forEach(function(techs){
      techObject.push(techs.dataValues);
    })
    console.log(techObject);
    res.render('admin', techObject);
  })
})

router.get('/admin/test2', function(req,res,next){
  models.technology.findAll({
  }).then(function(tech){
    res.render('admin', {tech:tech});
  })
})



module.exports = router;
