var mongoose = require('mongoose');

const citySchema = mongoose.Schema({
  _id: {
    type: Number
  },
  name: {
    type: String
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State'
  }
});

const City = mongoose.model('City', citySchema);
module.exports = City;
