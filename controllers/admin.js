var express = require('express');
var router = express.Router();

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

module.exports = router;
