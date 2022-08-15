var Leave = require("./../models/Leave");
var Holiday = require("./../models/Holiday");
const Response = require('./../utils/Response');
exports.dashboard = {
    dashboard: async function (req, res) {
        let userId = req.user._id;
        let role = req.user.role;
        let total_leave = await Leave.find(role===1 || role===2?{}:{created_by: userId}).count();
        let total_holiday = await Holiday.find({}).count();
        let data ={
            total_leave,
            total_holiday
        }
        let result = { message: "Dashboard record", data:data, status: true };
        return res.json(Response.Response(result));
    },
};
