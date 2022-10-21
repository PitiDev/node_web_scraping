var express = require('express');
var router = express.Router();


const transactionStatus = require('./controllers/transaction_report');
const teller_user = require('./controllers/teller_user');
const service_biz_admin = require('./controllers/service_biz_admin');
const login = require('./controllers/login');
const scrap  = require('./controllers/scraping');

router.use(transactionStatus);
router.use(teller_user);
router.use(service_biz_admin);
router.use(login);
router.use(scrap);


module.exports = router;