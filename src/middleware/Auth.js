const jwt = require("jsonwebtoken");
// const config = require('../config')
module.exports = function(req, res, next) {
  const token = req.header("token");
  if (!token) return res.json({ message: "Auth Error",status:false });
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded.user;
    let user_role = req.user.role;
    console.log(user_role,'user')
    // if(user_role!==config.ROLE.ADMIN)return res.json({ message: "You are not Authorized",status:false });
    next();
  } catch (e) {
    res.json({ message: "Invalid Token",status:false });
  }
};