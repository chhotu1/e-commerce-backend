const mongoose = require("mongoose");
const TimerSchema = mongoose.Schema({
    total_hours:String,
    status: Boolean,
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

const schema = mongoose.model('Timer', TimerSchema);

module.exports = schema;