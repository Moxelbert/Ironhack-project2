const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const placeSchema = new Schema({
  name: String,
  imgURL: { type: String, default: 'http://www.nadinedarling.com/uploads/5/0/2/3/50232891/blair-witch-house_orig.jpg' },
  description: String,
  createdByUser: { type: Schema.Types.ObjectId, ref: 'User'},
  visitedByUser: { type: Array, default: [] }
});

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;