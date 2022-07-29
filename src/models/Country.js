var mongoose = require('mongoose');
const countrySchema = mongoose.Schema({
    _id: {
        type: Number
    },
    sortname: {
        type: String
    },
    name: {
        type: String
    },
    states: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'State'
        }
    ]
});

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;