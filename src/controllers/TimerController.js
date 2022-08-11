var Timer = require("./../models/Timer");
const Response = require('./../utils/Response');
exports.timer = {
    store: async function (req, res) {
        let userId = req.user._id;
        try {
            req.body['created_by'] = userId;
            data = new Timer(req.body);
            await data.save();
            let result = { message: "Record added successfully", data: data, status: true };
            return res.json(Response.Response(result));
        } catch (error) {
            let result = { message: "Error in Saving" };
            return res.json(Response.Response(result));
        }
    },
    getLatestTimer: async function (req, res) {
        let userId = req.user._id;
        Timer.findOne({ created_by: userId }).sort({ created_at: -1 })
            .populate("created_by")
            .then((data) => {
                let result = { message: "Timer record", data: data, status: true };
                return res.json(Response.Response(result));
            })
            .catch((error) => {
                let result = { message: "Opps! something went wrong!", errors: error };
                return res.json(Response.Response(result));
            });
    },

    list: async function (req, res) {
        let userId = req.user._id;
        let role = req.user.role;
        Timer.find(role === 1 || role === 2 ? {} : { created_by: userId }).sort({ created_at: -1 })
            .populate("created_by")
            .then((data) => {
                let result = { message: "Timer record", data: data, status: true };
                return res.json(Response.Response(result));
            })
            .catch((error) => {
                let result = { message: "Opps! something went wrong!", errors: error };
                return res.json(Response.Response(result));
            });

    },
    showOne: async function (req, res) {
        if (!req.params.id) {
            return res.json({ status: false, success: false, data: '', message: "Timer id can not be empty" + req.params.id });
        }
        await Timer.findById(req.params.id).then(data => {
            return res.json({ status: true, success: true, statusCode: 200, data: data });
        }).catch(error => {
            return res.json({ status: false, success: false, statusCode: 40, data: error });
        })
    },
    update: async function (req, res) {
        await Timer.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(timer => {
                if (!timer) {
                    return res.json({ status: false, success: false, data: '', message: "timer not found with id" + req.params.id });
                }
                return res.json({ status: true, data: timer, message: 'timer Updated successfully' })

            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.json({ status: false, success: false, data: '', message: "timers not found with id " + req.params.id });
                }
                return res.json({ status: false, success: false, data: '', message: "Error updating timer with id" + req.params.id });
            });
    },

    delete: async function (req, res) {
        if (!req.params.id) {
            return res.json({ status: false, success: false, data: '', message: "Timer content can not be empty" + req.params.id });
        }
        await Timer.findByIdAndRemove(req.params.id)
            .then(timer => {
                if (!timer) {
                    return res.json({ status: false, success: false, data: '', message: "timer not found with id " + req.params.id });
                }

                return res.json({ status: true, success: true, data: '', message: "timer deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.json({ status: false, success: false, data: '', message: "timer not found with id " + req.params.id });
                }
                return res.json({ status: false, success: false, data: '', message: "Could not delete timer with id " + req.params.id });
            });
    }
};
