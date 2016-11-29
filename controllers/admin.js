var express = require('express');
var router = express.Router();
var models = require('../models');
var connectLogin = require('connect-ensure-login');
var sequelizeConnection = models.sequelize

// router.get('/admin', function(req, res, next) {
//   res.render('admin');
// });


router.get('/admin/jobs/api/create', function(req, res, next) {
  res.render('admin_job_search');
});

router.get('/admin/add/:target', function(req, res, next) {
  res.render('');
});

router.get('/admin/update/:target/:resource_id', function(req, res, next) {
  res.render('');
});

var data = {};//reserved for users  
router.get('/admin/users', connectLogin.ensureLoggedIn(), function (req, res, next) {
  // get user
  data.user = req.user;
  models.user.findAll({
  }).then(function (userInfo) {
    data.userInfo = userInfo;
  });
  res.render('admin_users', data);
});

//updating regular USER to ADMIN 
router.put('/admin/users/:id', connectLogin.ensureLoggedIn(), function (req, res, next) {
  // get user
  // data.user = req.user;
  console.log(req.body.admin_change);
  var id = req.params.id;
models.user.findById(id).then(function(userChange) {
  userChange.update({
    admin:req.body.admin_change
  })
})
  res.redirect('/admin/users');
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
router.get('/admin/resource/create', function(req,res,next){
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
router.post('/admin/resource/create', function (req, res){
  models.library.create({
    resource:req.body.library_resource
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
  
    res.redirect('/admin/resource/create');
  })

// add data to feed the job search api
router.post('/admin/jobs/api/create', function (req, res) {
	models.job_search.create({
    api_name: req.body.api_name,
    api_uri: req.body.api_uri,
    search_params: req.body.search_params
  }).then(function() {
    // console.log(req.body);
		res.redirect('/admin/jobs/api/create');
	});
});

module.exports = router;
