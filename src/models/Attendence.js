const mongoose = require("mongoose");
const AttendenceSchema = mongoose.Schema({
    present:{
        type: Boolean,
        enum: [true,false],
        default: true
    },
    status: {
        type: Number,
        enum: [1,2,3,4],
        default: 1
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

const schema = mongoose.model('Attendence', AttendenceSchema);

module.exports = schema;