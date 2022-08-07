var Notification = require("./../models/Notification");
const Response = require('./../utils/Response');
exports.notification = {
    store: async function (req, res) {
        let userId = req.user._id;
        try {
            req.body['created_by'] = userId;
            data = new Notification(req.body);
            await data.save();
            let result = { message: "Record added successfully", data: data, status: true };
            return res.json(Response.Response(result));
        } catch (error) {
            let result = { message: "Error in Saving" };
            return res.json(Response.Response(result));
        }
    },
    list: async function (req, res) {
        let userId = req.user._id;
        let role = req.user.role;
        Notification.find({})
            .populate("created_by")
            .then((data) => {
                let result = { message: "Notification record", data: data, status: true };
                return res.json(Response.Response(result));
            })
            .catch((error) => {
                let result = { message: "Opps! something went wrong!", errors: error };
                return res.json(Response.Response(result));
            });

    },
    showOne: async function (req, res) {
        if (!req.params.id) {
            return res.json({ status: false, success: false, data: '', message: "Notification id can not be empty" + req.params.id });
        }
        await Notification.findById(req.params.id).then(data => {
            return res.json({ status: true, success: true, statusCode: 200, data: data });
        }).catch(error => {
            return res.json({ status: false, success: false, statusCode: 40, data: error });
        })
    },
    update: async function (req, res) {
        const { title } = req.body;
        await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(notification => {
                if (!notification) {
                    return res.json({ status: false, success: false, data: '', message: "notification not found with id" + req.params.id });
                }
                return res.json({ status: true, data: notification, message: 'notification Updated successfully' })

            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.json({ status: false, success: false, data: '', message: "notification not found with id " + req.params.id });
                }
                return res.json({ status: false, success: false, data: '', message: "Error updating notification with id" + req.params.id });
            });
    },

    delete: async function (req, res) {
        if (!req.params.id) {
            return res.json({ status: false, success: false, data: '', message: "Notification content can not be empty" + req.params.id });
        }
        await Notification.findByIdAndRemove(req.params.id)
            .then(notification => {
                if (!notification) {
                    return res.json({ status: false, success: false, data: '', message: "notification not found with id " + req.params.id });
                }

                return res.json({ status: true, success: true, data: '', message: "notification deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.json({ status: false, success: false, data: '', message: "notification not found with id " + req.params.id });
                }
                return res.json({ status: false, success: false, data: '', message: "Could not delete notification with id " + req.params.id });
            });
    }
};
