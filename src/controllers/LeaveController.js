var Leave = require("./../models/Leave");
const Response = require('./../utils/Response');
exports.leave = {
    store: async function (req, res) {
        const { title, image_url, image_name } = req.body;
        let userId = req.user._id;
        try {
            req.body['created_by'] = userId;
            data = new Leave(req.body);
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
        Leave.find(role===1 || role===2?{}:{created_by: userId})
            .populate("created_by")
            .then((data) => {
                let result = { message: "Leave record", data: data, status: true };
                return res.json(Response.Response(result));
            })
            .catch((error) => {
                let result = { message: "Opps! something went wrong!", errors: error };
                return res.json(Response.Response(result));
            });

    },
    showOne: async function (req, res) {
        if (!req.params.id) {
            return res.json({ status: false, success: false, data: '', message: "Leave id can not be empty" + req.params.id });
        }
        await Leave.findById(req.params.id).then(data => {
            return res.json({ status: true, success: true, statusCode: 200, data: data });
        }).catch(error => {
            return res.json({ status: false, success: false, statusCode: 40, data: error });
        })
    },
    update: async function (req, res) {
        const { title } = req.body;
        await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(leave => {
                if (!leave) {
                    return res.json({ status: false, success: false, data: '', message: "leave not found with id" + req.params.id });
                }
                return res.json({ status: true, data: leave, message: 'leave Updated successfully' })

            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.json({ status: false, success: false, data: '', message: "leaves not found with id " + req.params.id });
                }
                return res.json({ status: false, success: false, data: '', message: "Error updating leave with id" + req.params.id });
            });
    },

    delete: async function (req, res) {
        if (!req.params.id) {
            return res.json({ status: false, success: false, data: '', message: "Leave content can not be empty" + req.params.id });
        }
        await Leave.findByIdAndRemove(req.params.id)
            .then(leave => {
                if (!leave) {
                    return res.json({ status: false, success: false, data: '', message: "leave not found with id " + req.params.id });
                }

                return res.json({ status: true, success: true, data: '', message: "leave deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.json({ status: false, success: false, data: '', message: "leave not found with id " + req.params.id });
                }
                return res.json({ status: false, success: false, data: '', message: "Could not delete leave with id " + req.params.id });
            });
    }
};
