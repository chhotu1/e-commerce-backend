const mongoose = require("mongoose");
const CategorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image:String,
    description:String,
    status: {
        type: Number,
        default: 1
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

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;