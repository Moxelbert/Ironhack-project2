const express = require("express");
const router  = express.Router();

const User = require('../models/User.js');
const Ghost = require('../models/Ghost.js');
const Place = require('../models/Place.js');
const {checkConnected} = require('../config/middlewares')


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/users', (req, res, next) => {
  User.find()
  .then(users => {
    res.render('users', {users: users});
  })
  .catch(error => {
    console.log('Error while getting users from DB:', error);
  })
});

router.get('/phenomenas', (req, res, next) => {
  Ghost.find()
  .then(phenomenas => {
    res.render('phenomenas', {phenomenas: phenomenas});
  })
  .catch(error => {
    console.log('Error while getting ghosts from DB:', error);
  })
});

router.get('/places', (req, res, next) => {
  Place.find()
  .then(places => {
    res.render('places', {places: places});
  })
  .catch(error => {
    console.log('Error while getting ghosts from DB:', places);
  })
});

router.get('/places/newPlace', checkConnected, (req, res, next) => {
  res.render('newPlace');
});

router.post('/places/newPlace', (req, res) => {
  // // 2 different ways of writing the same content
  // let name = req.body.name;
  // let imageURL = req.body.imageURL;
  // let description = req.body.description;
  let { name,imageURL,description } = req.body

  let createdByUser = req.user._id;
  const newPlace = new Place({name, imageURL, description, createdByUser})
  console.log("created by ", createdByUser)
  newPlace.save()
  .then(place => {
    console.log('New place:', place);
    res.redirect('/places');
  })
  .catch(error => {
    console.log(error);
  })
});

router.get('/phenomenas/newGhost', (req, res, next) => {
  console.log('logged in as:', req.user.username)
  res.render('newGhost');
});


router.post('/phenomenas/newGhost', (req, res) => {
  // console.log("DEBUG checkbox", req.body.checkbox)
  let name = req.body.name;
  let imageURL = req.body.imageURL;
  let description = req.body.description;
  let createdByUser = req.user._id; 
  let spottedAtPlace = req.body.spottedAtPlace;
  
  // 2 ways to write the same thing
  // let isDangerous;
  // if (req.body.checkbox == "on"){
  //   isDangerous = true
  // } else {isDangerous = false}
  let isDangerous = req.body.checkbox == "on"

  console.log("new value is now ", isDangerous)
  const newGhost = new Ghost({isDangerous, name, imageURL, description, createdByUser, spottedAtPlace})
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
  .populate("createdByUser")
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

// router.post('/phenomenas/updateGhost/:id', (req, res) => {
//   let update = req.user._id; 
//   console.log('User ID is ',update )
//   User.findOne({'_id': req.user._id})
//   .then(user => {
//     user = user.username;
//     console.log(user);
//     let ghostID = req.params.id;
//     Ghost.findByIdAndUpdate(
//       ghostID, 
//       {$push: {'spottedByUser': user}})
//       .then( _ => {
//         res.redirect('../');
//   })
//   })
// })

router.post('/phenomenas/updateGhost/:id', (req, res) => {
  let update = req.user._id;
  console.log('User ID is ', update)
  User.findOne({ '_id': req.user._id })
    .then(user => {
      user = user.username;
      console.log(user);
      let ghostID = req.params.id;
      Ghost.findByIdAndUpdate(
        ghostID,
        { $push: { 'spottedByUser': user } })
        .then(_ => {
          Ghost.findOne({ '_id': req.params.id })
            .then(ghost => {
              ghost = ghost.name;
              console.log(ghost);
              // let userID = user._id;
              console.log(update);
              User.findByIdAndUpdate(
                update,
                { $push: { 'ghostsSeen': ghost } })
                .then(_ => {
                  res.redirect('../');
                })
            })
        })
    })
})


// router.post('/places/updatePlace/:id', (req, res) => {
//   let update = req.user._id; 
//   console.log('User ID is ',update )
//   User.findOne({'_id': req.user._id})
//   .then(user => {
//     user = user.username;
//     console.log(user);
//     let placeID = req.params.id;
//     Place.findByIdAndUpdate(
//       placeID, 
//       {$push: {'visitedByUser': user}})
//       .then( _ => {
//         res.redirect('../');
//   })
//   })
// })


router.post('/places/updatePlace/:id', (req, res) => {
  let update = req.user._id; 
  console.log('User ID is ',update )
  User.findOne({'_id': req.user._id})
  .then(user => {
    user = user.username;
    console.log(user);
    let placeID = req.params.id;
    Place.findByIdAndUpdate(
      placeID, 
      {$push: {'visitedByUser': user}})
      .then( _ => {
        Place.findOne({'_id': req.params.id})
        .then(place => {
          place = place.name;
          console.log(place);
          // let userID = user._id;
          console.log(update);
          User.findByIdAndUpdate(
            update, 
            {$push: {'placesVisited': place}})
            .then( _ => {
            res.redirect('../');
  })
  })
})
  })
})

  

module.exports = router;