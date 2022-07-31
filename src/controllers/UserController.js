
var User = require('./../models/User');
const bcrypt = require("bcryptjs");
const Response = require('./../utils/Response')

// const userService = require('./../service/user.service')
exports.user = {
    getAllUsers: function (req, res) {
        let userId = req.user._id;
        User.find({_id:{ $ne: userId }}).sort({created_at: -1})
        .then((data) => {
            let result = { message: "Users data",status: true,data:data };
            return res.json(Response.Response(result));
        })
        .catch((error) => {
            return res.json({ status: false, success: true, statusCode: 40 });
        });
    },

    showOne: async function (req, res) {
        if (!req.params.id) {
            return res.json({ status: false, success: false, data: '', message: "User id can not be empty " });
        }
        await User.findById(req.params.id).then(data => {
            if (data)
                return res.json({ status: true, success: true, statusCode: 200, data: data, message: 'User Profile data' });
            return res.json({ status: false, success: true, statusCode: 200, data: '', message: 'User Not Exists' });

        }).catch(error => {
            return res.json({ status: false, success: false, statusCode: 40, data: error });
        })
    },
    
    userProfile: async function (req, res) {
        let userId = req.user._id;
        if (!userId) {
            return res.json({ status: false, success: false, data: '', message: "User id can not be empty " });
        }
        await User.findById(userId).then(data => {
            if (data)
                return res.json({ status: true, success: true, statusCode: 200, data: data, message: 'User Profile data' });
            return res.json({ status: false, success: true, statusCode: 200, data: '', message: 'User Not Exists' });
        }).catch(error => {
            return res.json({ status: false, success: false, statusCode: 40, data: error });
        })
    },
    delete: async function (req, res) {
        if (!req.params.id) {
            return res.json({ status: false, success: false, data: '', message: "Users content can not be empty" + req.params.id });
        }
        await User.findByIdAndRemove(req.params.id)
            .then(user => {
                if (!user) {
                    return res.json({ status: false, success: false, data: '', message: "Users not found with id " + req.params.id });
                }
                return res.json({ status: true, success: true, data: '', message: "Users deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.json({ status: false, success: false, data: '', message: "Users not found with id " + req.params.id });
                }
                return res.json({ status: false, success: false, data: '', message: "Could not delete Users with id " + req.params.id });
            });
    },
    profilePhotoChange: async function (req, res) {
        let photo = '';
        let userId = req.user._id;
        let name = req.user.name;
        if (req.files) {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send('No files were uploaded.');
            }
            if (req.files.photo) {
                let sampleFile = req.files.photo;
                let fileName = sampleFile.name.split(".");
                fileName = fileName[0] + name + Date.now() + '.' + fileName[1];
                photo = '/uploads/user/' + fileName;
                sampleFile.mv('./uploads/user/' + fileName, function (err) {
                    if (err)
                        return res.status(500).send(err);
                });
                await User.findByIdAndUpdate(userId, {
                    photo: photo
                }, { new: true })
                    .then(user => {
                        if (!user) {
                            return res.json({ status: false, success: false, data: '', message: "user not found with id" + userId });
                        }
                        return res.json({ status: true, data: user, message: 'user Updated successfully' })

                    }).catch(err => {
                        if (err.kind === 'ObjectId') {
                            return res.json({ status: false, success: false, data: '', message: "users not found with id " + userId });
                        }
                        return res.json({ status: false, success: false, data: '', message: "Error updating user with id" + userId });
                    });
                return res.json({ status: true, success: true, data: fileName, message: "Profile photo selected" });
            }
        } else {
            return res.json({ status: false, success: true, data: '', message: "Profile photo not selected" });
        }
    },
    update: async function (req, res) {
        const { name, phone, email } = req.body;
        let user_email = await User.findOne({
            _id: req.params.id
        });
        if (user_email) {
            if (user_email.email !== email) {
                let user = await User.findOne({
                    email
                });
                if (user) {
                    if (user_email.email !== email) {
                        return res.json({
                            message: "User Already Exists",
                            status: false
                        });
                    }
                }
            }
        }
        
        delete req.body.password;
        await User.findByIdAndUpdate(req.params.id,req.body, { new: true })
            .then(user => {
                if (!user) {
                    return res.json({ status: false, success: false, data: '', message: "user not found with id" + req.params.id });
                }
                return res.json({ status: true, data: user, message: 'user Updated successfully' })

            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.json({ status: false, success: false, data: '', message: "users not found cnn with id " + req.params.id });
                }
                return res.json({ status: false, success: false, data: '', message: "Error updating user with id" + req.params.id });
            });
    },
    changePassword: async function (req, res) {
        var passwordDetails = req.body;
        if (req.user) {
            if (passwordDetails.newPassword) {
                User.findById(req.user._id, async function (err, user) {
                    if (!err && user) {
                        const isMatch = await bcrypt.compare(passwordDetails.currentPassword, user.password);
                        if (!isMatch) {
                            return res.json({
                                message: "Incorrect Password !",
                                status: false
                            });
                        }
                        if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
                            user.password = passwordDetails.newPassword;
                            user.save(function (err) {
                                if (err) {
                                    return res.json({
                                        message: errorHandler.getErrorMessage(err),
                                        status: false
                                    });
                                }
                                return res.json({
                                    message: 'Password changed successfully',
                                    status: true
                                });
                                // else {
                                // req.login(user, function (err) {
                                //     if (err) {
                                //     res.status(400).send(err);
                                //     } else {
                                //     res.send({
                                //         message: 'Password changed successfully'
                                //     });
                                //     }
                                // });
                                // }
                            });
                        } else {
                            res.json({
                                message: 'Passwords do not match',
                                status: false
                            });
                        }

                    } else {
                        res.json({
                            message: 'User is not found',
                            status: false
                        });
                    }
                });
            } else {
                res.json({
                    message: 'Please provide a new password',
                    status: false
                });
            }
        } else {
            res.json({
                message: 'User is not signed in',
                status: false
            });
        }
    }
};
