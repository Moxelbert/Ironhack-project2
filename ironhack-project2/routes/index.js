const express = require('express');
const router  = express.Router();

const Ghost = require('../models/Ghost.js');
const Place = require('../models/Place.js');

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

module.exports = router;


