const mongoose = require("mongoose");
const SalarySlipSchema = mongoose.Schema({
    total_leave:Number,
    total_salary:Number,
    basic_salary:Number,
    detect_salary:Number,
    date_of_salary:String,
    status: {
        type: Number,
        enum: [1,2,3,4],
        default: 1
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    user: {
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

const schema = mongoose.model('SalarySlip', SalarySlipSchema);

module.exports = schema;