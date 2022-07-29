var mongoose = require('mongoose');
const stateSchema = mongoose.Schema({
    _id: {
      type: Number
    },
    name: {
      type: String
    },
    cities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
      }
    ],
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country'
    }
  });

  const State = mongoose.model('State', stateSchema);
module.exports = State;
