var express = require('express');
var router = express.Router();
var models = require('../models');
var connectLogin = require('connect-ensure-login');
var sequelizeConnection = models.sequelize

//HOME PAGE
router.get('/admin/home', connectLogin.ensureLoggedIn(), function(req, res, next) {
  var data = {};
  data.user = req.user
  res.render('admin_home', data);
});

//JOBS
router.get('/admin/jobs/api/add', connectLogin.ensureLoggedIn(), function(req, res, next) {
  var data = {};
  data.user = req.user;
  models.user.findOne({
    where:{
      user_name:req.user.username
    }
  }).then(function(user){
      if(user.admin == false){
        res.redirect('/admin/noaccess');
      }else{
        models.job_search.findAll({
        }).then(function(jobList){
        data.jobList = jobList;
        res.render('admin_job_search', data);
         })
      }
   })
});

//RESTRICTED PAGE MESSAGE
router.get('/admin/noaccess', connectLogin.ensureLoggedIn(), function(req, res, next) {
  var data = {};
  data.user = req.user;
  res.render('admin_noaccess', data);
});

//EMPTY FIELD MESSAGE
router.get('/admin/emptyfield', connectLogin.ensureLoggedIn(), function(req, res, next) {
  var data = {};
  data.user = req.user;
  models.user.findOne({
    where:{
      user_name:req.user.username
    }
  }).then(function(user){
      if(user.admin == false){
        res.redirect('/admin/noaccess');
      }else{res.render('admin_emptyfield', data);}
  });
});

//USERS
router.get('/admin/users', connectLogin.ensureLoggedIn(), function (req, res, next) {
  var data = {};
  data.user = req.user;
  models.user.findOne({
    where:{
      user_name:req.user.username
    }
  }).then(function(user){
      if(user.admin == false){
        res.redirect('/admin/noaccess');
      }else{
        models.user.findAll({
  }).then(function (userInfo) {
    data.userInfo = userInfo;
    res.render('admin_users', data);
  });
}
  });

});

//RESOURECE TYPE
router.get('/admin/resource/type', connectLogin.ensureLoggedIn(), function (req, res, next) {
  var resourceData = {};
  resourceData.user = req.user;
  models.user.findOne({
    where:{
      user_name:req.user.username
    }
  }).then(function(user){
      if(user.admin == false){
        res.redirect('/admin/noaccess');
      }else{
            models.resource_type.findAll({
            }).then(function (resourceInfo) {
              resourceData.resourceInfo = resourceInfo;
              res.render('admin_resource_type', resourceData);
            });
          }
            });    
});

// TECHNOLOGY TYPE
router.get('/admin/technology/type', connectLogin.ensureLoggedIn(), function (req, res, next) {
  var technologyData = {};
  technologyData.user = req.user;
  models.user.findOne({
    where:{
      user_name:req.user.username
    }
  }).then(function(user){
      if(user.admin == false){
        res.redirect('/admin/noaccess');
      }else{
            models.technology.findAll({
            }).then(function (technologyInfo) {
              technologyData.technologyInfo = technologyInfo;
              res.render('admin_technology', technologyData);
            });
          }
            });
});



// THIS WORKS PERFECT IF YOU CALL {{tech}} IN THE HBS FILE, BUT I'M TRING TO DO A COMBO OBJECT BELOW. NEED TO FIGUIRE OUT THE ROUTE THAT MAKES THE MOST SENSE FOR THIS PAGE
// router.get('/admin/test', function(req,res,next){
//   models.technology.findAll({
//   }).then(function(tech){
//     res.render('admin', {tech:tech});
//   })
// })

// LIST RESOURCE && CHAINED TWO GETS FROM TWO DIFFERENT TABLES

router.get('/admin/resource/add', connectLogin.ensureLoggedIn(), function(req,res,next){
  var techResource = {};
  techResource.user = req.user;
   models.user.findOne({
    where:{
      user_name:req.user.username
    }
  }).then(function(user){
      if(user.admin == false){
        res.redirect('/admin/noaccess');
      }else{
              models.technology.findAll({
              }).then(function(tech){
              techResource.tech = tech;
            }).then(function(){
              models.resource_type.findAll({
            }).then(function(resources){
              techResource.resources = resources;
              // res.render('admin', techResource);
            }).then(function(){
                models.library.findAll({
                }).then(function(lib){
                  techResource.lib = lib;
                  res.render('admin', techResource);
              })
            })
              })

          }
      }); 
})


//updating regular USER to ADMIN 
router.put('/admin/users/:id', connectLogin.ensureLoggedIn(), function (req, res, next) {
  var id = req.params.id;
  models.user.findById(id).then(function(userChange) {
    userChange.update({
      admin:req.body.admin_change
    });
  });
      res.redirect('/admin/users');
});

//DELETE USER
router.delete('/admin/users/delete/:id', connectLogin.ensureLoggedIn(), function (req, res, next) {
  var id = req.params.id;
  models.user.destroy({
      where:{
        id: id
      }
    });
      res.redirect('/admin/users');
});


// Adding resources with two associations
router.post('/admin/resource/add', connectLogin.ensureLoggedIn(), function (req, res){
  if (req.body.library_resource == 0 || req.body.library_name == 0 ) {
        res.redirect('/admin/emptyfield')
		}else{models.library.create({
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
    }
  })

// add data to feed the job search api
router.post('/admin/jobs/api/add', connectLogin.ensureLoggedIn(), function (req, res) {
	if (req.body.api_name.length == 0 || req.body.api_uri.length == 0 || req.body.search_params.length == 0) {
        res.redirect('/admin/emptyfield')
		}else{models.job_search.create({
    api_name: req.body.api_name,
    api_uri: req.body.api_uri,
    search_params: req.body.search_params
  }).then(function() {
    // console.log(req.body);
		res.redirect('/admin/jobs/api/add');
	});
    }
});

// add new resource_type to resource_type table
router.post('/admin/resource/type/add', connectLogin.ensureLoggedIn(), function (req, res) {
  if (req.body.resource_type_name.length == 0) {
        res.redirect('/admin/emptyfield')
		}else{
      models.resource_type.create({
        type: req.body.resource_type_name
      }).then(function() {
        res.redirect('/admin/resource/type');
      });
    }
  });

  // add new technology to technology table
router.post('/admin/technology/type/add', connectLogin.ensureLoggedIn(), function (req, res) {
  if (req.body.technology_type.length == 0) {
        res.redirect('/admin/emptyfield')
		}else{
      models.technology.create({
        tech: req.body.technology_type
      }).then(function() {
        res.redirect('/admin/technology/type');
      });
    }
  });


module.exports = router;
// models.user.findOne({
//     where:{
//       user_name:req.user.username
//     }
//   }).then(function(user){
//       if(user.admin == false){
//         res.redirect('/admin/noaccess');
//       }else{
//             xxxxx
//           }
//             });