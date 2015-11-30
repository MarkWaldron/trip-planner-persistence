var express = require('express');
var router = express.Router();
var models = require('../../models');
var Day = models.Day;
var Hotel = models.Hotel;
var Activity = models.Activity;
var Restaurant = models.Restaurant;

router.param("id", function (req, res, next, id){
  Day.findOne({number: id}).then(function(day){
    if(day.length == 0){
      Day.create({
        number: id,
        hotel: null,
        restaurants: [],
        activities: []
      })
      .then(function(day){
        next();
      })
      .then(null, function(err){
        console.log(err);
      })
    } else {
      req.day = day;
    }
  });
  next();
  //do crap to get the day from the id
})

router.get('/days',function(req, res, next){
  // return all days;

});

router.get('/days/:id', function(req, res, next){
  //return a single day
});

router.put('/days/:id/:item/:placeName', function(req, res, next){
  //add to req.params.item in day model
  // console.log(req.params.item);
  if(req.params.item === 'hotels'){
    Day.findOne({number: req.params.id}).then(function(day){
      // console.log(day);
      console.log(req.params.placeName);
      Hotel.findOne({name: req.params.placeName}).then(function(place){
        day.hotel = place._id;
        console.log(place._id)
        console.log(day);
        return day.save(function(err){
          console.log(err);
        });
      })
    })
  } else if(req.params.item === 'restaurants'){
      console.log('Inside restaurants');
      Day.findOne({number: req.params.id}).then(function(day){
        console.log(day);
        Restaurant.findOne({name: req.params.placeName}).then(function(place){
          if(day['restaurants'].length == 3){
            day['restaurants'].pop();
          }
          day['restaurants'].push(place._id);
          return day.save(function(err){
            console.log(err);

          });
          // next();
        })
      })
  } else if(req.params.item === 'activities'){
    console.log('Inside activities');
      Day.findOne({number: req.params.id}).then(function(day){
        console.log(day);
        Activity.findOne({name: req.params.placeName}).then(function(place){
          if(day['activities'].length == 3){
            day['activities'].pop();
          }
          day['activities'].push(place._id);
          day.save(function(err){
            console.log(err);
          });
          // next();
        })
      })
  } else {
    res.status(404).send();
    next();
  }

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
