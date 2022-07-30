require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
// const multer = require('multer')
const path = require('path')

var http = require('http');
require('dotenv').config({ path: "./.env" });
// var urlencode = require('urlencode'); 
const db = require('./src/config/db')
const setRoutes = require('./src/routes');
const fileUpload = require('express-fileupload');
global.appRoot = path.resolve(__dirname);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// global error handler
app.use('/src/uploads', express.static(path.join(__dirname, '../src/uploads')));
app.use('/apidoc', express.static(path.join(__dirname)));
// app.use('/uploads/resumes', express.static(path.join(__dirname, '../uploads/resumes')));
app.use('/src/uploads', express.static('src/uploads')); 

//upload image
db();


app.use(fileUpload());
app.post('/api/uploadImage', function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.image;
    let fileName = sampleFile.name.split(".");
    fileName = fileName[0] + Date.now() + '.' + fileName[1];

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('./uploads/' + fileName, function (err) {
        if (err)
            return res.status(500).send(err);
        res.send({ fileName: fileName });

    });
});

app.use('/api',require('./src/routes'));

app.post('/testing', function (req, res) {
    res.send({ fileName: 'welcome Messages' });
    // req.file will now hold the uploaded file
    // req.body will hold the text fields of the form
 });

 app.get('/', function (req, res) {
    res.send({ fileName: 'welcome Messages' });
  
 });


// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('we are in </br>  Server listening on port ' + port), console.log(`url:https://localhost:${port}`));