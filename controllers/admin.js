var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/admin', function(req, res, next) {
  res.render('admin');
});

router.get('/admin/create', function(req, res, next) {
  res.render('job_search');
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



// THIS WORKS PERFECT IF YOU CALL {{tech}} IN THE HBS FILE, BUT I'M TRING TO DO A COMBO OBJECT BELOW. NEED TO FIGUIRE OUT THE ROUTE THAT MAKES THE MOST SENSE FOR THIS PAGE
// router.get('/admin/test', function(req,res,next){
//   models.technology.findAll({
//   }).then(function(tech){
//     res.render('admin', {tech:tech});
//   })
// })
var techResource = {};
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
    //  console.log(techResource.resource);
    res.render('admin', techResource);
  })
})




// add data to feed the job search api
router.post('/admin/create', function (req, res) {
	models.job_search.create({
    api_name: req.body.api_name,
    api_uri: req.body.api_uri,
    search_params: req.body.search_params,
    default_city: req.body.default_city,
    key_word: req.body.key_word
  }).then(function() {
    console.log(req.body);
		res.redirect('/admin');
	});
});

module.exports = router;
