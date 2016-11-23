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

// **FOUND AN EASIER WAY TO GET THE DATA, see below,-g**
// router.get('/admin/test', function(req,res, next){
//   models.technology.findAll({
//     attributes: ['tech']
//   }) .then(function(data){
//     // console.log(data[0].dataValues.tech);
//     var techObject = [];
//     data.forEach(function(techs){
//       techObject.push(techs.dataValues);
//     })
//     console.log(techObject);
//     res.render('admin', techObject);
//   })
// })
;
var techResource = {};

// NEED TO THE ROUTE THAT MAKES THE MOST SENSE FOR THIS PAGE, ALL TOGETHER OR SEPARATE
// router.get('/admin/test', function(req,res,next){
//   models.technology.findAll({
//   }).then(function(tech){
//     res.render('admin', {tech:tech});
//   })
// })

router.get('/admin/test', function(req,res,next){
  models.technology.findAll({
  }).then(function(tech){
   techResource.tech = tech
  //  console.log(techResource.tech)
   res.render('admin', techResource);
  })
})

router.get('/admin/test', function(req,res,next){
  models.resource_type.findAll({
  }).then(function(resources){
    techResource.resources = resources
     console.log(techResource.resource);
    res.render('admin', techResource);
  })
})




module.exports = router;
