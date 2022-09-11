const express = require('express');
const balanceController = require('../controllers/balanceController');

const router = express.Router();

router.route('/erc20/:address').get(balanceController.getERC20Balances);
router.route('/rate/erc20').get(balanceController.getERC20Rate);

module.exports = router;
