const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')
global.__basedir = __dirname;
var jsonParser = bodyParser.json()

const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.json())
app.use(cors());
const PORT = process.env.PORT || 4000;
app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});
app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});