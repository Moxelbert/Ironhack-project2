const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  imgURL: { type: String, default: 'https://images.immediate.co.uk/volatile/sites/3/2017/09/bill-murray-cbd942a.jpg?quality=90&resize=768,574' },
  description: String,
  placesVisited: { type: Array, default: [] },
  ghostsSeen: { type: Array, default: [] }
});

const User = mongoose.model('User', userSchema);
module.exports = User;