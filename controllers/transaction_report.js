var express = require('express');
var router = express.Router();
var jwt = require('../jwt');
var connection = require('../db');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var oracledb = require('oracledb');


router.get('/transaction_status', async function (req, res) {
    console.log('=== url param = ',req.query);
    try {
        conn = await oracledb.getConnection();
        oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
        let sql = `SELECT * FROM ebank.transaction_status where from_acct_no = ${req.query.id}`;
        conn.execute(sql, [], function (err, result) {
            if (err) {
                console.error('DB: == ', err.message);
            }
            res.json({
                'status': 'success',
                'account': req.query.id,
                'data': result.rows
            });

        });
        await conn.close();
    } catch (err) {
        console.error('DB ERR: ', err);
    }
});


module.exports = router;