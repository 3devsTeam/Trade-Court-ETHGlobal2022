const express = require('express');
const balanceController = require('../controllers/balanceController');

const router = express.Router();

router.route('/rate/:chainId').get(balanceController.getRate);
router.route('/list/:chainId').get(balanceController.listTokens);
router.route('/:chainId/:address').get(balanceController.getBalance);
module.exports = router;
