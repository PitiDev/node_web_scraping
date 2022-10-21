var express = require('express');
var router = express.Router();
var jwt = require('../jwt');
var connection = require('../db');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var oracledb = require('oracledb');


router.get('/company', async function (req, res) {
    console.log('=== url param = ', req.query);
    try {
        conn = await oracledb.getConnection();
        oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
        let sql = `SELECT * FROM ebank.company_customer where PROVINCE LIKE '%${req.query.id}%'`;
        conn.execute(sql, [], function (err, result) {
            if (err) {
                console.error('DB: == ', err.message);
            }
            let message;
            if (result.rows == '') {
                message = 'No Data';
            } else {
                message = 'success';
            }
            res.json({
                'code': res.statusCode,
                'message': message,
                'province': req.query.id,
                'res_data': result.rows
            });
            console.log(result.rows);

        });
        await conn.close();
    } catch (err) {
        console.error('DB ERR: ', err);
    }
});


module.exports = router;