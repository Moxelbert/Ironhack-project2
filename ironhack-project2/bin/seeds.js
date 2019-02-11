const mongoose = require('mongoose');
const Ghost = require('../models/Ghost');
const User = require('../models/User');
const Place = require('../models/Place');

const projectDB = 'Project2-DB';
mongoose.connect(`mongodb://localhost/${projectDB}`);

const users = [
  {
  name: 'Moritz',
  description: 'Passionate medium with excellent connections to the other side.' 
  }
]
const ghosts = [
  {
    name : "Headless Horsemen",
    imgURL: "https://cdn-images-1.medium.com/max/1600/0*VM9DRng0L84LcFHb.jpg",
    description: "The Headless Horseman is a mythical figure who has appeared in folklore around the world since at least the Middle Ages. The Headless Horseman is traditionally depicted as a man upon horseback who is missing his head. Depending on the legend, the Horseman is either carrying his head, or is missing his head altogether, and is searching for it.",
    isDangerous: true 
  },
  {
    name : "Ghost of Anne Boleyn",
    imgURL: "https://vignette.wikia.nocookie.net/pdsh/images/e/e6/Anne-boleyns-ghost.jpg/revision/latest/scale-to-width-down/250?cb=20131025181225",
    description: "Anne Boleyn was the 2nd wife of King Henry VIII of England and mother of Queen Elizabeth I. Henry had her beheaded on (probably/most likely) false accounts of treason in order to marry his third wife, Jane Seymour. A number of people have claimed to have seen Anne\'s ghost at Hever Castle, Blickling Hall, Salle Church, Tower of London, and Marwell Hall.",
    isDangerous: false
  },
  {
    name : "Flying Dutchman",
    imgURL: "https://vignette.wikia.nocookie.net/non-aliencreatures/images/f/fa/FlyingDutchman.jpg/revision/latest?cb=20170817022852",
    description: "The Flying Dutchman (Dutch: De Vliegende Hollander) is a legendary ghost ship that can never make port and is doomed to sail the oceans forever. The myth is likely to have originated from the 17th-century golden age of the Dutch East India Company (VOC). The oldest extant version has been dated to the late 18th century. Sightings in the 19th and 20th centuries reported the ship to be glowing with ghostly light. If hailed by another ship, the crew of the Flying Dutchman will try to send messages to land, or to people long dead. In ocean lore, the sight of this phantom ship is a portent of doom.",
    isDangerous: false
  }
];

const places = [
  {
    name : "Čachtice Castle",
    imgURL: "https://assets.atlasobscura.com/media/W1siZiIsInVwbG9hZHMvcGxhY2VfaW1hZ2VzL1Nsb3Zha2lhX0NhY2h0aWNlX2hyYWRfMi5KUEciXSxbInAiLCJ0aHVtYiIsIngzOTA-Il0sWyJwIiwiY29udmVydCIsIi1xdWFsaXR5IDgxIC1hdXRvLW9yaWVudCJdXQ/Slovakia_Cachtice_hrad_2.jpg",
    description: "Čachtice Castle is a castle ruin in Slovakia next to the village of Čachtice. It stands on a hill featuring rare plants, and has been declared a national nature reserve for this reason. The castle was a residence and later the prison of the Countess Elizabeth Báthory, who is alleged to have been the world's most prolific female serial killer",  
  },
  {
    name : "Aokigahara Forest",
    imgURL: "https://s24193.pcdn.co/wp-content/uploads/2017/06/Entity-Suicide-Forest.jpg",
    description: "Long associated with the ghosts of the dead in Japanese literature and folklore, this forest on hardened lava became known in recent years as “the suicide forest.” Signs at some trailheads now advertise help-line information to hikers."  
  },
 { 
  name : "Capuchin Castle",
  imgURL: "https://i.pinimg.com/originals/26/93/e6/2693e6ebc756e6e38a6c323302083f82.jpg",
  description: "Mummies of more than 2,000 individuals lie within the catacombs of this Sicilian monastery, many dressed to reflect the station they held in life. Initially reserved exclusively for the burial of religious officials, it was later expanded to include noblemen and the families of wealthy benefactors—like the young Rosalia Lombardo, called the “Sleeping Beauty” for her impeccably-preserved remains.",
  }
];

User.deleteMany()
.then(successCallback => {
  console.log('deleting successful')
  User.create(users, (err) => {
    if (err) { throw(err) }
    console.log(`Created ${users.length} users`)
    mongoose.connection.close();
  })
})
.catch(errorCallback => {
  console.log('deleting not successful')
});

Ghost.deleteMany()
.then(successCallback => {
  console.log('deleting successful')
  Ghost.create(ghosts, (err) => {
    if (err) { throw(err) }
    console.log(`Created ${ghosts.length} ghosts`)
    mongoose.connection.close();
  });
})
.catch(errorCallback => {
  console.log('deleting not successful')
});

Place.deleteMany()
.then(successCallback => {
  console.log('deleting successful')
  Place.create(places, (err) => {
    if (err) { throw(err) }
    console.log(`Created ${places.length} places`)
    mongoose.connection.close();
  });
})
.catch(errorCallback => {
  console.log('deleting not successful')
});

  