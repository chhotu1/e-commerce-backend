var Appraisal = require("./../models/Appraisal");
const Response = require('./../utils/Response');
exports.appraisals = {
    store: async function (req, res) {
        let userId = req.user._id;
        try {
            req.body['created_by'] = userId;
            data = new Appraisal(req.body);
            await data.save();
            let result = { message: "Record added successfully", data: data, status: true };
            return res.json(Response.Response(result));
        } catch (error) {
            console.log(error);
            let result = { message: "Error in Saving" };
            return res.json(Response.Response(result));
        }
    },
    list: async function (req, res) {
        Appraisal.find({}).sort({ created_at: -1 })
            .populate("created_by")
            .populate("user")
            .then((data) => {
                let result = { message: "Appraisal record", data: data, status: true };
                return res.json(Response.Response(result));
            })
            .catch((error) => {
                let result = { message: "Opps! something went wrong!", errors: error };
                return res.json(Response.Response(result));
            });

    },
    showOne: async function (req, res) {
        if (!req.params.id) {
            return res.json({ status: false, success: false, data: '', message: "Appraisal id can not be empty" + req.params.id });
        }
        await Appraisal.findById(req.params.id).then(data => {
            return res.json({ status: true, success: true, statusCode: 200, data: data });
        }).catch(error => {
            return res.json({ status: false, success: false, statusCode: 40, data: error });
        })
    },
    update: async function (req, res) {
        await Appraisal.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(response => {
                if (!response) {
                    return res.json({ status: false, success: false, data: '', message: "Appraisal not found with id" + req.params.id });
                }
                return res.json({ status: true, data: response, message: 'Appraisal Updated successfully' })

            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.json({ status: false, success: false, data: '', message: "Appraisals not found with id " + req.params.id });
                }
                return res.json({ status: false, success: false, data: '', message: "Error updating Appraisal with id" + req.params.id });
            });
    },

    delete: async function (req, res) {
        if (!req.params.id) {
            return res.json({ status: false, success: false, data: '', message: "Appraisal content can not be empty" + req.params.id });
        }
        await Appraisal.findByIdAndRemove(req.params.id)
            .then(response => {
                if (!response) {
                    return res.json({ status: false, success: false, data: '', message: "Appraisal not found with id " + req.params.id });
                }

                return res.json({ status: true, success: true, data: '', message: "Appraisal deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.json({ status: false, success: false, data: '', message: "Appraisal not found with id " + req.params.id });
                }
                return res.json({ status: false, success: false, data: '', message: "Could not delete Appraisal with id " + req.params.id });
            });
    }
};
