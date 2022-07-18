const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    image:String,
    image_name:String,
    galleries:Array,
    price:String,
    discription:String,
    slug:String,
    offer:{
        type:Number,
        enum: [0,1],
        default: 0
    },
    offer_price:{
        type:Number,
        default:0,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;