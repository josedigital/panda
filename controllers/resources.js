var express = require('express');
var router = express.Router();
var request = require('request-promise');
var connectLogin = require('connect-ensure-login');
var models = require('../models');

router.get('/resources/meetups', connectLogin.ensureLoggedIn(), function (req, res, next) {
  res.redirect('/resources/meetups/html');
});

router.get('/resources/meetups/:tech', connectLogin.ensureLoggedIn(), function(req, res, next) {
  var data = {};
  // get user
  data.user = req.user;
  data.tech = req.params.tech;

  models.job_search.findOne({where: {api_name: 'Meetups'} }).then(function (apiprovider) {
    console.log(apiprovider);
    console.log(apiprovider.search_params);
    var searchString = apiprovider.search_params;
    var queryString = JSON.parse(searchString);

    queryString.text = req.params.tech;

    request({
      uri: apiprovider.api_uri,
      qs: queryString,
      json: true
    })
      .then( function (muResults) {
        data.meetups = muResults;

        models.technology.findAll({
        }).then(function(tech){
          data.technology = tech;
          // active tech
          for(i in data.technology) {
            if(data.technology[i].tech === data.tech) {
              data.technology[i].active = 'active';
            } else {
              data.technology[i].active = 'non-active';
            }
          }

          
          res.render('meetups', data);
        });

      })
      .catch( function (error) {
        console.log(error);
        res.json(error);
      });

    });

});

var data = {};
router.get('/resources', connectLogin.ensureLoggedIn(), function(req,res,next){
  
  data.user = req.user;

  models.technology.findAll({
    }).then(function(tech){
    data.technology = tech;
    for(var t in data.technology) {
      data.technology[t].link = 'resources/' + data.technology[t].tech;
    }
    res.redirect('resources/video/html');
  });

});


router.get('/resources/:type', connectLogin.ensureLoggedIn(), function (req, res, next) {
  
  data.user = req.user;
  data.type = req.params.type;

    // get techs from db
  models.technology.findAll({
  }).then(function(tech){
    data.technology = tech;
    // iterate over techs to display on nav
    for(t in data.technology) {
      // console.log(data.technology[t].tech);
      data.technology[t].link = data.type + '/' + data.technology[t].tech;
      // console.log(data.technology[t].link); 
    }

    models.resource_type.findAll({
    }).then(function (types) {
      data.resourceTypes = types;
      // active tab
      for(t in data.resourceTypes) {
        if(data.resourceTypes[t].type === data.type) {
          data.resourceTypes[t].active = 'active';
        } else {
          data.resourceTypes[t].active = '';
        }
      }
      res.render('resources-new', data);      
    });
  });
});

router.get('/resources/:type/:tech', connectLogin.ensureLoggedIn(), function (req, res, next) {
  
  data.user = req.user;
  data.type = req.params.type;
  data.tech = req.params.tech;

  // active tab
  models.resource_type.findAll({
  }).then(function (types) {
    data.resourceTypes = types;
    // active tab
    for(t in data.resourceTypes) {
      if(data.resourceTypes[t].type === data.type) {
        data.resourceTypes[t].active = 'active';
      } else {
        data.resourceTypes[t].active = '';
      }
    }


    // get techs from db
    models.technology.findAll({
    }).then(function(tech){
      data.technology = tech;

      // active tech
      for(i in data.technology) {
        if(data.technology[i].tech === data.tech) {
          data.technology[i].active = 'active';
        } else {
          data.technology[i].active = 'non-active';
        }
      }

      res.render('resources-new', data);

    });
    // no fucking clue how to get the resources !!!!!!
    // get tech id
    // models.technology.findAll({
    //   where: {
    //     tech: data.tech
    //   }
    // }).then(function (technology) {
    //   data.techid = technology.id;
    // });
    // models.library.findAll({
    //   include: [{
    //     model: models.technology,
    //     where: {tech: data.tech}
    //   }]
    // }).then(function (records) {
    //   console.log(records);
    //   data.records = records;
      
    // });

    
          
  });

  
});

// router.get('/resources', connectLogin.ensureLoggedIn(), function(req,res,next){

//     var data = {};
//     data.user = req.user;
//     data.intro = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

//     models.technology.findAll({
//       }).then(function(tech){
//       data.technology = tech;
//     }).then(function(){

//       for(var t in data.technology) {

//             data.technology[t].link = 'resources/' + data.technology[t].tech;

//           }

//           res.render('resources', data);
//     });
// });

// THIS ROUTE IS CURRENTLY NOT BEING USED
// **************************************
// router.get('/resources/:tech/:type', function(req, res, next) {
//   // models.technology.findOne({where: {tech: 'JQUERY'}})
//   // .then(function(tech){
//   //   return tech.getLibraries()
//   // }).then(function(){
//   models.library.findAll({
//     include: [{
//       model: models.technology,
//       where: {tech:'JQUERY'}
//     },{
//       model: models.resource_type,
//       where: {type:'VIDEO'}
//     }]
//   })
//   .then(function(lib){
//     return res.json(lib);
//   });
// });

// router.get('/resources/:tech', function(req, res, next) {

//   var data = {};
//   data.user = req.user;
//   data.tech = req.params.tech;

//   models.technology.findAll({
//     }).then(function(tech){
//     data.technology = tech;
//   }).then(function(){
//     models.resource_type.findAll({
//   }).then(function(resources){
//     data.resources = resources;

//     for(var r in data.resources) {

//       data.resources[r].link = data.tech + "/" + data.resources[r].type;

//     }

//     models.library.findAll({
//       include: [{
//         model: models.technology,
//         where: {tech: data.tech}
//       }]
//     }).then(function(libraries){

//       data.libraries = libraries;
//       console.log(data);
//       res.send(data);

//     });

//     });
//   });
// });

module.exports = router;
