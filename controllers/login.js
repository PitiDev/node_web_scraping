var express = require('express');
var router = express.Router();
var jwt = require('../jwt');
var connection = require('../db');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var oracledb = require('oracledb');




module.exports = router;
