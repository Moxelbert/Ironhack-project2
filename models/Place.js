const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  name: String,
<<<<<<< HEAD
  imgURL: {
    type: String,
    default:
      "https://www.wildpark-schwarze-berge.de/wp-content/uploads/das_kleine_gespenst_lesung.jpg"
  },
=======
  imgURL: { type: String, default: 'http://www.nadinedarling.com/uploads/5/0/2/3/50232891/blair-witch-house_orig.jpg' },
>>>>>>> 33c81957686f27ed7da8c9a36b5e0e298d134236
  description: String,
  createdByUser: { type: Schema.Types.ObjectId, ref: "User" },
  visitedByUser: { type: Array, default: [] },
<<<<<<< HEAD
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number]
    }
  }
=======
//   location: {
//     type: {
//     type: String, 
//     enum: ['Point'],
//     default: 'Point',
// }, 
//   coordinates: {
//    type: [Number],
//    required: true
//   }
// }
>>>>>>> 33c81957686f27ed7da8c9a36b5e0e298d134236
});

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;