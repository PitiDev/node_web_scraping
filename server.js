const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var expressSanitizer = require('express-sanitizer');
var cors = require('cors');
const app = express();


app.options('*', cors());
app.use(express.static(path.join(__dirname, './uploaded')));


app.use(function (req, res, next) {
    
    res.setHeader('Access-Control-Allow-Origin', '*'); //'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'content-type, x-access-token');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb',extended: false}));
app.use(expressSanitizer());

app.use('/api/v1', require('./api.js'));



const server = app.listen(9999, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Running ... http://localhost%s', host, port);
});

//https://registry.npmjs.org/oracledb/-/oracledb-5.5.0.tgz