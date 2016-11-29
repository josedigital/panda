var express = require('express');
var router = express.Router();
var models = require('../models');
var connectLogin = require('connect-ensure-login');
var sequelizeConnection = models.sequelize

// router.get('/admin', function(req, res, next) {
//   res.render('admin');
// });


router.get('/admin/jobs/api/add', connectLogin.ensureLoggedIn(), function(req, res, next) {
  data.user = req.user;
  res.render('admin_job_search', data);
});

// router.get('/admin/add/:target', function(req, res, next) {
//   res.render('');
// });

// router.get('/admin/update/:target/:resource_id', function(req, res, next) {
//   res.render('');
// });

var data = {};//reserved for users  
router.get('/admin/users', connectLogin.ensureLoggedIn(), function (req, res, next) {
  // get user
  data.user = req.user;
  models.user.findAll({
  }).then(function (userInfo) {
    data.userInfo = userInfo;
    res.render('admin_users', data);
  });
  
});

var resourceData = {};//reserved for resourcestypes  
router.get('/admin/resource/type', connectLogin.ensureLoggedIn(), function (req, res, next) {
  // get user
  resourceData.user = req.user;
  models.resource_type.findAll({
  }).then(function (resourceInfo) {
    resourceData.resourceInfo = resourceInfo;
    res.render('admin_resource_type', resourceData);
  });
  
});

var technologyData = {};//reserved for technology  
router.get('/admin/technology/type', connectLogin.ensureLoggedIn(), function (req, res, next) {
  // get user
  technologyData.user = req.user;
  models.technology.findAll({
  }).then(function (technologyInfo) {
    technologyData.technologyInfo = technologyInfo;
    res.render('admin_technology', technologyData);
  });
  
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
router.get('/admin/resource/add', connectLogin.ensureLoggedIn(), function(req,res,next){
  techResource.user = req.user;
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


//updating regular USER to ADMIN 
router.put('/admin/users/:id', connectLogin.ensureLoggedIn(), function (req, res, next) {
  // console.log(req.body.admin_change);
  var id = req.params.id;
  models.user.findById(id).then(function(userChange) {
    userChange.update({
      admin:req.body.admin_change
    });
  });
      res.redirect('/admin/users');
});
// THIS GIT WORKS FINE ON IT'S OWN'
// router.get('/admin/test', function(req,res,next){
//   models.resource_type.findAll({
//   }).then(function(resources){
//     techResource.resources = resources
//     //  console.log(techResource.resource);
//     res.render('admin', techResource);
//   })
// })

// Adding resources with two associations
router.post('/admin/resource/add', connectLogin.ensureLoggedIn(), function (req, res){
  models.library.create({
    resource:req.body.library_resource,
    resource_name:req.body.library_name
  }).then(function(newlibrary){
		return models.resource_type.findOne({where: {type: req.body.resource_type} })
		.then(function(resource){
			return resource.addLibrary(newlibrary);
		})
	})//end of first promise
      .then(function(){
        return models.library.findOne({where: {resource: req.body.library_resource} })
        .then(function(lib){
          return models.technology.findOne({where: {tech: req.body.tech_association} })
            .then(function(tech){
              return lib.addTechnology(tech)
          })
        })
      })
  
    res.redirect('/admin/resource/add');
  })

// add data to feed the job search api
router.post('/admin/jobs/api/add', connectLogin.ensureLoggedIn(), function (req, res) {
	models.job_search.create({
    api_name: req.body.api_name,
    api_uri: req.body.api_uri,
    search_params: req.body.search_params
  }).then(function() {
    // console.log(req.body);
		res.redirect('/admin/jobs/api/add');
	});
});

// add new resource_type to resource_type table
router.post('/admin/resource/type/add', connectLogin.ensureLoggedIn(), function (req, res) {
  if (req.body.resource_type_name.length == 0) {

        res.redirect('/home')
	      

		}else{
      models.resource_type.create({
        type: req.body.resource_type_name
      }).then(function() {
        // console.log(req.body);
        res.redirect('/admin/resource/type');
      });
    }
  });

  // add new technology to technology table
router.post('/admin/technology/type/add', connectLogin.ensureLoggedIn(), function (req, res) {
  if (req.body.technology_type.length == 0) {

        res.redirect('/home')
	      

		}else{
      models.technology.create({
        tech: req.body.technology_type
      }).then(function() {
        // console.log(req.body);
        res.redirect('/admin/technology/type');
      });
    }
  });


module.exports = router;
