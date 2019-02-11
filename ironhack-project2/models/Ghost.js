const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ghostSchema = new Schema({
  name: String,
  imgURL: { type: String, default: 'https://www.wildpark-schwarze-berge.de/wp-content/uploads/das_kleine_gespenst_lesung.jpg' },
  description: String,
  isDangerous: Boolean,
  createdByUser: { type: Schema.Types.ObjectId, ref: 'User'},
  spottedByUser: { type: Array, default: [] },
  spottedAtPlace: { type: Array, default: [] } 
});

const Ghost = mongoose.model('Ghost', ghostSchema);
module.exports = Ghost;

