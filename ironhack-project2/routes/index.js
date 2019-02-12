const express = require("express");
const router  = express.Router();

const User = require('../models/User.js');
const Ghost = require('../models/Ghost.js');
const Place = require('../models/Place.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/about', (req, res, next) => {
  res.render('about');
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.get('/login', (req, res, next) => {
  res.render('login');
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

router.get('/:id', (req, res, next) => {
  Ghost.findOne({'_id': req.params.id})
  .then(ghost => {
    res.render('ghostDetails', {ghost: ghost});
  })
})

router.get('/places/:id', (req, res, next) => {
  Place.findOne({'_id': req.params.id})
  .then(place => {
    res.render('placeDetails', {place: place});
  })
})

router.get('/phenomenas/newGhost', (req, res, next) => {
  res.render('newGhost');
});

router.get('/places/newPlaces', (req, res, next) => {
  res.render('newPlace');
});

router.post('/newGhost', (req, res) => {
  let name = req.body.name;
  let imageURL = req.body.imageURL;
  let description = req.body.description;
  let isDangerous = req.body.isDangerous;
  let createdByUser = createdByUser;
  // let spottedByUser = spottedByUser; 
  // let spottedAtPlace = req.body.spottedAtPlace;
  const newGhost = new Ghost({name, imageURL, description, isDangerous, createdByUser, spottedByUser, spottedAtPlace})
  newGhost.save()
    .then(ghost => {
    console.log('New ghost:', ghost);
    res.redirect('phenomenas');
  })
  .catch(error => {
    console.log(error);
  })
});
  
module.exports = router;