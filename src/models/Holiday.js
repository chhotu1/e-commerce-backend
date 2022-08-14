const mongoose = require("mongoose");
const HolidaySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    start_date:String,
    end_date:String,
    description:String,
    status: {
        type: Number,
        enum: [1,2,3,4],
        default: 1
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    deleted_at: Date,
});

const schema = mongoose.model('Holiday', HolidaySchema);

module.exports = schema;