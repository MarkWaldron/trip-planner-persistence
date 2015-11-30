var express = require('express');
var router = express.Router();

router.get('/days',function(req, res, next){
  // return all days
});

router.get('/days/:id', function(req, res, next){
  //return a single day
});

router.put('/days/:id/:item', function(req, res, next){
  //add to req.params.item in day model
});

router.delete('/days/:id/:item', function(req, res, next){
  //deletes an item from a day
});

router.delete('/days/:id', function(req, res, next){
  //delete a day
});

router.put('/days/:id', function(req, res, next){
  //create a day
});



router.use(function(err, req, res, next){
  res.status(err.status || 500).end();
});


module.exports = router;
