var express = require('express');
var router = express.Router();
var models = require('../models');
var sequelizeConnection = models.sequelize

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


// THIS WORKS PERFECT IF YOU CALL {{tech}} IN THE HBS FILE, BUT I'M TRING TO DO A COMBO OBJECT BELOW. NEED TO FIGUIRE OUT THE ROUTE THAT MAKES THE MOST SENSE FOR THIS PAGE
// router.get('/admin/test', function(req,res,next){
//   models.technology.findAll({
//   }).then(function(tech){
//     res.render('admin', {tech:tech});
//   })
// })

// CHAINED TWO GETS FROM TWO DIFFERENT TABLES
var techResource = {};
router.get('/admin/test', function(req,res,next){
    models.technology.findAll({
      }).then(function(tech){
      techResource.tech = tech;
    }).then(function(){
      models.resource_type.findAll({
    }).then(function(resources){
      techResource.resources = resources;
      res.render('admin', techResource);
    })
  })
})

// THIS GIT WORKS FINE ON IT'S OWN'
// router.get('/admin/test', function(req,res,next){
//   models.resource_type.findAll({
//   }).then(function(resources){
//     techResource.resources = resources
//     //  console.log(techResource.resource);
//     res.render('admin', techResource);
//   })
// })

// The association I don't think are working, because I'm assumig we should also get an entry in the middle man table, which I don't see happening. 
router.post('/admin/test', function (req, res){
  models.library.create({
    resource:req.body.library_resource
  }).then(function(newlibrary){
		return models.resource_type.findOne({where: {type: req.body.resource_type} })
		.then(function(resource){
			return resource.addLibrary(newlibrary);
		})
	})
    res.redirect('/admin/test');
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
    // console.log(req.body);
		res.redirect('/admin');
	});
});

module.exports = router;
