const mongoose = require("mongoose");
const LeaveSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
   
    start_date:String,
    end_date:String,
    leave_type:String,
    description:String,
    status: {
        type: Number,
        enum: [1,2,3,4],
        default: 2
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

const schema = mongoose.model('Leave', LeaveSchema);

module.exports = schema;