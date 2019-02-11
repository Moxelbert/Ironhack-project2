const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const placeSchema = new Schema({
  name: String,
  imgURL: { type: String, default: 'https://www.wildpark-schwarze-berge.de/wp-content/uploads/das_kleine_gespenst_lesung.jpg' },
  description: String,
  createdByUser: { type: Schema.Types.ObjectId, ref: 'User'},
  visitedByUser: { type: Array, default: [] }
});

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;