require('dotenv').config();

const mongoose = require('mongoose');
const Ghost = require('../models/Ghost');
const User = require('../models/User');
const Place = require('../models/Place');
const bcrypt = require("bcrypt");

const bcryptSalt = 10;


mongoose.connect(process.env.MONGODB_URI);


const users = [
  {
  username: 'Moritz',
  password: bcrypt.hashSync("password", bcrypt.genSaltSync(bcryptSalt)),
  imgURL: 'https://images.immediate.co.uk/volatile/sites/3/2017/09/bill-murray-cbd942a.jpg?quality=90&resize=768,574',
  description: 'Passionate medium with excellent connections to the other side.', 
  placesVisited: ['Aokigahara Forest'],
  ghostsSeen: ['Headless Horseman', 'Flying Dutchman'],
},
{
  username: 'Alex',
  password: bcrypt.hashSync("password", bcrypt.genSaltSync(bcryptSalt)),
  imgURL: 'https://upload.wikimedia.org/wikipedia/en/3/37/Harold_Ramis_as_Egon_Spengler.jpg',
  description: 'Paranormal guy', 
  placesVisited: ['Capuchin Castle'],
  ghostsSeen: ['Ghost of Anne Boleyn', 'Flying Dutchman'], 
  },
  {
  username: 'Dr. Jürgen V.',
  password: bcrypt.hashSync("password", bcrypt.genSaltSync(bcryptSalt)),
  imgURL: 'https://static.wixstatic.com/media/07909e_64885126da9e45f4a5d98e59fac5eec6~mv2_d_3714_4848_s_4_2.jpg/v1/crop/x_0,y_303,w_3714,h_2968/fill/w_478,h_382,al_c,q_80,usm_0.66_1.00_0.01/07909e_64885126da9e45f4a5d98e59fac5eec6~mv2_d_3714_4848_s_4_2.jpg',
  description: 'Expert on everything', 
  placesVisited: ['Had sex on every continent (including the Arctic)'],
  ghostsSeen: ['Ghost of Anne Boleyn', 'Flying Dutchman'], 
  }  
]
const ghosts = [
  {
    name : "Headless Horsemen",
    imgURL: "https://cdn-images-1.medium.com/max/1600/0*VM9DRng0L84LcFHb.jpg",
    description: "The Headless Horseman is a mythical figure who has appeared in folklore around the world since at least the Middle Ages. The Headless Horseman is traditionally depicted as a man upon horseback who is missing his head. Depending on the legend, the Horseman is either carrying his head, or is missing his head altogether, and is searching for it.",
    spottedByUser: ['Moritz', 'Alex'],
    spottedAtPlace: ['Capuchin Castle'],
    isDangerous: true 
  },
  {
    name : "Ghost of Anne Boleyn",
    imgURL: "https://vignette.wikia.nocookie.net/pdsh/images/e/e6/Anne-boleyns-ghost.jpg/revision/latest/scale-to-width-down/250?cb=20131025181225",
    description: "Anne Boleyn was the 2nd wife of King Henry VIII of England and mother of Queen Elizabeth I. Henry had her beheaded on (probably/most likely) false accounts of treason in order to marry his third wife, Jane Seymour. A number of people have claimed to have seen Anne\'s ghost at Hever Castle, Blickling Hall, Salle Church, Tower of London, and Marwell Hall.",
    spottedByUser: ['Alex'],
    spottedAtPlace: ['Aokigahara Forest'],
    isDangerous: false
  },
  {
    name : "Flying Dutchman",
    imgURL: "https://vignette.wikia.nocookie.net/non-aliencreatures/images/f/fa/FlyingDutchman.jpg/revision/latest?cb=20170817022852",
    description: "The Flying Dutchman (Dutch: De Vliegende Hollander) is a legendary ghost ship that can never make port and is doomed to sail the oceans forever. The myth is likely to have originated from the 17th-century golden age of the Dutch East India Company (VOC). The oldest extant version has been dated to the late 18th century. Sightings in the 19th and 20th centuries reported the ship to be glowing with ghostly light. If hailed by another ship, the crew of the Flying Dutchman will try to send messages to land, or to people long dead. In ocean lore, the sight of this phantom ship is a portent of doom.",
    spottedByUser: ['Alex, Moritz'],
    spottedAtPlace: ['Aokigahara Forest', 'Čachtice Castle'],
    isDangerous: false
  },
  {
    name : "Baba Yaga",
    imgURL: "https://cdni.rbth.com/rbthmedia/images/all/2016/08/15/bilibin/bilibin2.jpg",
    description: "In Slavic folklore, Baba Yaga is a supernatural being (or one of a trio of sisters of the same name) who appears as a deformed and/or ferocious-looking woman. Baba Yaga flies around in a mortar, wields a pestle, and dwells deep in the forest in a hut usually described as standing on chicken legs.",
    spottedByUser: ['Dr. Jürgen V., Moritz'],
    spottedAtPlace: ['Amityville'],
    isDangerous: true
  },
  {
    name : "Fet-Mats",
    imgURL: "https://alchetron.com/cdn/fet-mats-9c1df7c6-6fe0-4063-87ae-f8666dfa757-resize-750.jpeg",
    description: "Fet-Mats (\'Fat Mats\') (real name: Mats Israelsson) (died 1677) was a \'petrified man\' found in 1719. In 1719, miners in the Falun copper mine found an intact dead body in a water-filled, long-unused tunnel. When they brought the body to the surface, it was identified by his former fiancée, Margaret Olsdotter, as Fet-Mats Israelsson, who had disappeared 42 years earlier.",
    spottedByUser: ['Dr. Jürgen V., Alex'],
    spottedAtPlace: ['Palace of Linares'],
    isDangerous: true
  },
  {
    name : "Krampus",
    imgURL: "https://f4.bcbits.com/img/a4190515217_10.jpg",
    description: "In Central European folklore, Krampus is a horned, anthropomorphic figure described as \'half-goat, half-demon\',who, during the Christmas season, punishes children who have misbehaved, in contrast with Saint Nicholas, who rewards the well-behaved with gifts.",
    spottedByUser: ['Alex, Moritz'],
    spottedAtPlace: ['Eltz Castle'],
    isDangerous: true
  }
];

const places = [
  {
    name : "Čachtice Castle",
    imgURL: "https://assets.atlasobscura.com/media/W1siZiIsInVwbG9hZHMvcGxhY2VfaW1hZ2VzL1Nsb3Zha2lhX0NhY2h0aWNlX2hyYWRfMi5KUEciXSxbInAiLCJ0aHVtYiIsIngzOTA-Il0sWyJwIiwiY29udmVydCIsIi1xdWFsaXR5IDgxIC1hdXRvLW9yaWVudCJdXQ/Slovakia_Cachtice_hrad_2.jpg",
    description: "Čachtice Castle is a castle ruin in Slovakia next to the village of Čachtice. It stands on a hill featuring rare plants, and has been declared a national nature reserve for this reason. The castle was a residence and later the prison of the Countess Elizabeth Báthory, who is alleged to have been the world's most prolific female serial killer",  
    location : {
      type: "Point",
      coordinates: [6.4,51.2]
    }
  },
  {
    name : "Aokigahara Forest",
    imgURL: "https://s24193.pcdn.co/wp-content/uploads/2017/06/Entity-Suicide-Forest.jpg",
    description: "Long associated with the ghosts of the dead in Japanese literature and folklore, this forest on hardened lava became known in recent years as “the suicide forest.” Signs at some trailheads now advertise help-line information to hikers." ,
    location : {
      type: "Point",
      coordinates: [45,78]
    }
  },
 { 
  name : "Capuchin Castle",
  imgURL: "https://i.pinimg.com/originals/26/93/e6/2693e6ebc756e6e38a6c323302083f82.jpg",
  description: "Mummies of more than 2,000 individuals lie within the catacombs of this Sicilian monastery, many dressed to reflect the station they held in life. Initially reserved exclusively for the burial of religious officials, it was later expanded to include noblemen and the families of wealthy benefactors—like the young Rosalia Lombardo, called the “Sleeping Beauty” for her impeccably-preserved remains.",
  location : {
    type: "Point",
    coordinates: [56,13]
  }
},
  { 
   name : "Amityville",
   imgURL: "https://www.thewrap.com/wp-content/uploads/2016/11/Amityville-Horror-House.jpg",
   description: "Amityville is a village in the town of Babylon in Suffolk County, New York, in the United States. In November 1974, Ronald DeFeo, Jr. shot all six members of his family at 112 Ocean Avenue. In December 1975 George and Kathy Lutz and Kathy's three children moved into the house, but left after twenty-eight days, claiming to have been terrorized by paranormal phenomena produced by the house.",
   location : {
    type: "Point",
    coordinates: [-73, 40.6]
  }
  },
   { 
    name : "Eltz Castle",
    imgURL: "https://img.fotocommunity.com/der-klassiker-burg-eltz-39339944-0299-4d18-a73a-84664d04b1e3.jpg?height=1080",
    description: "This picturesque castle is still occupied by descendants of the original family, and they might not be the only ones that stuck around. Burg Eltz is one of few castles in Germany that has never been destroyed and its medieval atmosphere is said to cater to the dead as well as the living. Ghosts of medieval knights have been spotted still patrolling the castle.",
    location : {
      type: "Point",
      coordinates: [18.4,-33]
    }   
  },
    { 
     name : "Palace of Linares",
     imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Palacio_de_Linares_-_01.jpg/1024px-Palacio_de_Linares_-_01.jpg",
     description: "Built between 1872 and 1890 for the Marquis of Linares José de Murga. According to legend this place is the most haunted in Spain. Supposedly, a little girl appears in the mansion, the Marquis fathered her with his sister and they murdered her in order to hide their incestuous relationship.",
     location : {
      type: "Point",
      coordinates: [51, -0.07]
    } 
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

