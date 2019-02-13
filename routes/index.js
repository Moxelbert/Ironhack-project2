const express = require("express");
const router  = express.Router();

// const User = require('../models/User.js');
const Ghost = require('../models/Ghost.js');
const Place = require('../models/Place.js');
const { checkConnected } = require('../config/middlewares')


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/about', (req, res, next) => {
  res.render('about');
});


router.get('/phenomenas', (req, res, next) => {
  Ghost.find()
  .then(phenomenas => {
    console.log('success!!!!!!!!!!!!!', phenomenas);
    res.render('phenomenas', {phenomenas: phenomenas});
  })
  .catch(error => {
    console.log('Error while getting ghosts from DB:', error);
  })
});

router.get('/places', (req, res, next) => {
  Place.find()
  .then(places => {
    console.log('success!!!!!!!!!!!!!', places);
    res.render('places', {places: places});
  })
  .catch(error => {
    console.log('Error while getting ghosts from DB:', places);
  })
});

router.get('/places/newPlace', checkConnected, (req, res, next) => {
  res.render('newPlace');
});

router.get('/phenomenas/newGhost', (req, res, next) => {
  console.log('logged in as:', req.user.username)
  res.render('newGhost');
});

router.post('/newGhost', (req, res) => {
  console.log("DEBUG reg.user", req.user._id)
  let name = req.body.name;
  let imageURL = req.body.imageURL;
  let description = req.body.description;
  let isDangerous = req.body.isDangerous;
  let createdByUser = req.user._id;
  // let spottedByUser = spottedByUser; 
  let spottedAtPlace = req.body.spottedAtPlace;
  const newGhost = new Ghost({name, imageURL, description, isDangerous, createdByUser, spottedAtPlace})
  newGhost.save()
  .then(ghost => {
    console.log('New ghost:', ghost);
    res.redirect('phenomenas');
  })
  .catch(error => {
    console.log(error);
  })
});

router.get('/places/:id', (req, res, next) => {
  Place.findOne({'_id': req.params.id})
  .then(place => {
    res.render('placeDetails', {place: place});
  })
})

router.get('/phenomenas/:id', (req, res, next) => {
  Ghost.findOne({'_id': req.params.id})
  .populate("createdByUser")
  .then(ghost => {
    res.render('ghostDetails', {ghost: ghost});
  })
})

module.exports = router;