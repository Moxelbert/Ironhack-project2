const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  name: String,
  imgURL: {
    type: String,
    default:
      "https://www.wildpark-schwarze-berge.de/wp-content/uploads/das_kleine_gespenst_lesung.jpg"
  },
  description: String,
  createdByUser: { type: Schema.Types.ObjectId, ref: "User" },
  visitedByUser: { type: Array, default: [] },
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
});

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;

// store coordinates as a polygon
// have them appear on the map
