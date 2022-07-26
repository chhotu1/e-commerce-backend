const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true, sparse: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        enum: [1,2,3,4,5,6,7,8,9,10],
        default: 2
    },
    date_of_birth:String,
    experience:String,
    specialist:String,
    parmanent_address:String,
    current_address:String,
    parmanent_state:String,
    parmanent_city:String,
    parmanent_country:String,
    parmanent_pincode:String,
    current_state:String,
    current_city:String,
    current_country:String,
    current_pincode:String,
    adhar_no:String,
    pain_no:String,
    father_mobile_no:String,
    phone: String,
    other_phone: String,
    friend_phone: String,
    photo: String,
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


UserSchema.pre('save', function (next) {

    const user = this;
    const now = new Date();
    user.updated_at = now;

    if (!user.created_at) {
        user.created_at = now;
    }

    if (!user.isModified('password')) {
        return next();
    }
    // generate a salt
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, (err1, hash) => {
            if (err1) { return next(err1); }
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
