require('rootpath')();
const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload');
require('dotenv').config({ path: "./.env" });
// const setRoutes = require('./src/routes');

const db = require('./src/config/db')

global.appRoot = path.resolve(__dirname);
const app = express();
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/uploads', express.static('uploads')); 

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())
app.use(cors());

db();

app.use('/api',require('./src/routes'));

const PORT = process.env.LISTEN_PORT || 4000;
app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});
app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});