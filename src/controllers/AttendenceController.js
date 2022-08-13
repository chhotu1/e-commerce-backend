var Attendence = require("./../models/Attendence");
const Response = require('./../utils/Response');
exports.attendence = {
    store: async function (req, res) {
        let userId = req.user._id;
        try {
            let users =req.body;
            if(!Array.isArray(users)){
                let result = { message: "This record is not array" };
                return res.json(Response.Response(result));
            }
            users.map((e)=>e['created_by']=userId);
            let data = await Attendence.insertMany(users);
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
        Attendence.find({}).sort({created_at: -1})
            .populate("created_by")
            .populate("user_id")
            .then((data) => {
                let result = { message: "Attendence record", data: data, status: true };
                return res.json(Response.Response(result));
            })
            .catch((error) => {
                let result = { message: "Opps! something went wrong!", errors: error };
                return res.json(Response.Response(result));
            });
    },
    showOne: async function (req, res) {
        if (!req.params.id) {
            return res.json({ status: false, success: false, data: '', message: "Attendence id can not be empty" + req.params.id });
        }
        await Attendence.findById(req.params.id).then(data => {
            return res.json({ status: true, success: true, statusCode: 200, data: data });
        }).catch(error => {
            return res.json({ status: false, success: false, statusCode: 40, data: error });
        })
    },
    update: async function (req, res) {
        await Attendence.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(attendence => {
                if (!attendence) {
                    return res.json({ status: false, success: false, data: '', message: "Attendence not found with id" + req.params.id });
                }
                return res.json({ status: true, data: Attendence, message: 'Attendence Updated successfully' })

            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.json({ status: false, success: false, data: '', message: "Attendences not found with id " + req.params.id });
                }
                return res.json({ status: false, success: false, data: '', message: "Error updating Attendence with id" + req.params.id });
            });
    },

    delete: async function (req, res) {
        if (!req.params.id) {
            return res.json({ status: false, success: false, data: '', message: "Attendence content can not be empty" + req.params.id });
        }
        await Attendence.findByIdAndRemove(req.params.id)
            .then(attendence => {
                if (!attendence) {
                    return res.json({ status: false, success: false, data: '', message: "attendence not found with id " + req.params.id });
                }

                return res.json({ status: true, success: true, data: '', message: "attendence deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.json({ status: false, success: false, data: '', message: "attendence not found with id " + req.params.id });
                }
                return res.json({ status: false, success: false, data: '', message: "Could not delete attendence with id " + req.params.id });
            });
    }
};
