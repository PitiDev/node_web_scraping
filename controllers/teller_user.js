var express = require('express');
var router = express.Router();
var jwt = require('../jwt');
var connection = require('../db');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var oracledb = require('oracledb');


router.get('/teller_user', async function (req, res) {

    try {
        conn = await oracledb.getConnection();
        oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
        let sql = `SELECT * FROM ebank.teller_user`;
        conn.execute(sql, [], function (err, result) {
            if (err) {
                console.error('DB: == ', err.message);
            }
            res.json({
                'status': 'success',
                'data': result.rows
            });

        });
        // await conn.close();
    } catch (err) {
        console.error('DB ERR: ', err);
    }
});

router.get('/emp_user', async function (req, res) {
    console.log('=== url emp_user = ', req.query);
    try {
        conn = await oracledb.getConnection();
        oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
        let sql = `select * from LDBHR.EMPLOYEE where EMP_NUMBER LIKE '${req.query.id}'`;
        conn.execute(sql, [], function (err, result) {
            if (err) {
                console.error('DB: == ', err.message);
            }
            res.json({
                'status': 'success',
                'data': result.rows
            });

        });
        await conn.close();
    } catch (err) {
        console.error('DB ERR: ', err);
    }
});


module.exports = router;