const express = require("express");
const router  = express.Router();

// const User = require('../models/User.js');
const Ghost = require('../models/Ghost.js');
const Place = require('../models/Place.js');
const { checkConnected } = require('../config/middlewares')
const mapbox = require('../public/javascripts/geocode')

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
  console.log('test')
  Place.find()
  .then(places => {
    console.log('success!!!!!!!!!!!!!', places);
    res.render('places', {places: places});
  })
  .catch(error => {
    console.log('Error while getting ghosts from DB:', places);
  })
});

router.post('/places/newPlace', checkConnected, (req, res, next) => {
let {location,name, description} = req.body
console.log('TCL: location', location)
console.log(req.body,"WE ARE HERE NOW")
  mapbox(
    process.env.MAPBOX_KEY,
    location,
    function (err, data) {
			console.log('TCL: data', )
      const newPlace = new Place({
        name, 
        description, 
        location: {
          coordinates: data.features[0].center,
        }
      });
      console.log("THIS ARE THE VALUES", newPlace)
      newPlace
        .save()
        .then(event => {
          res.redirect("/Places");
        })
        .catch(err => console.log(err));
      /*console.log(`LONG & LAT of ${address} `,data.features[0].center);*/
    }
  );
  res.render('newPlace');
});

router.get('/phenomenas/newGhost', (req, res, next) => {
  console.log('logged in as:', req.user.username)
  res.render('newGhost');
});

router.get('/places/newPlace', (req, res, next) => {
  console.log('logged in as:', req.user.username)
  res.render('newPlace');
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