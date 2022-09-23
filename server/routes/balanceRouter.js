const express = require('express');
const balanceControllerEthereum = require('../controllers/balanceController/ethereum/balanceController');
const balanceControllerPolygon = require('../controllers/balanceController/polygon/balanceController');
const balanceControllerOptimism = require('../controllers/balanceController/optimism/balanceController');

const router = express.Router();

router.route('/ethereum/:address').get(balanceControllerEthereum.getBalance);
router.route('/rate/ethereum').get(balanceControllerEthereum.getRate);

router.route('/polygon/:address').get(balanceControllerPolygon.getBalance);
router.route('/rate/polygon').get(balanceControllerPolygon.getRate);

router.route('/optimism/:address').get(balanceControllerOptimism.getBalance);
router.route('/rate/optimism').get(balanceControllerOptimism.getRate);
// router.route('/tokens/:url').get(balanceController.getTokenImg);
module.exports = router;
