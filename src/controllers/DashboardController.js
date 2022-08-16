var Leave = require("./../models/Leave");
var Holiday = require("./../models/Holiday");
var Attendence = require("./../models/Attendence");
const Response = require('./../utils/Response');
const Constant = require('./../config/Constant')
exports.dashboard = {
    dashboard: async function (req, res) {
        let userId = req.user._id;
        let role = req.user.role;
        let total_leave = await Leave.find(role===Constant.ADMIN || role===Constant.HR_MANEGER?{}:{created_by: userId}).count();
        let total_attendence = await Attendence.find(role===Constant.ADMIN || role===Constant.HR_MANEGER?{}:{user_id: userId}).count();
        let total_holiday = await Holiday.find({}).count();
        let data ={
            total_leave,
            total_holiday,
            total_attendence
        }
        let result = { message: "Dashboard record", data:data, status: true };
        return res.json(Response.Response(result));
    },
};
