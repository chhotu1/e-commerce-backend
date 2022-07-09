
var User = require('./../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.auth = {
    register: async function (req, res, next) {
        const {
            name,
            email,
            password,
            phone,
            address,
            role
        } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.json({
                    message: "User Already Exists",
                    status:false,
                    data:{},
                });
            }

            user = new User({
                name,
                email,
                password,
                phone,
                address,
                role
            });

            await user.save();
            const payload = {
                user
            };

            jwt.sign(
                payload,
                process.env.TOKEN_SECRET, {
                expiresIn: '24h'
            },
                (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({
                        token,
                        data: user,
                        status:true,
                        message:'User added successfully'
                    });
                }
            );
        }
        catch (err) {
            res.status(500).send("Error in Saving");
        }
    },
    login: async function (req, res, next) {
        const { email, password } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (!user)
                return res.json({
                    message: "User Not Exist",
                    status:false,
                    data:{},
                });
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.json({
                    message: "Incorrect Password !",
                    status:false,
                    data:{},
                });

            const payload = {
                user
            };

            jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                {
                    expiresIn: '24h'
                },
                (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({
                        token,
                        data:user,
                        status:true,
                        message:'User login successfully'
                    });
                }
            );
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                message: "Server Error"
            });
        }
    },

    getAllUsers: function (req, res) {
        User.find({}, function (err, users) {
            if (err) {
                return res.json({ success: false, statusCode: 500, errorMessage: err });
            }
            return  res.json({ success: true, statusCode: 200, data: users });
        })
    }
};
