const express = require('express');
const balanceControllerEthereum = require('../controllers/balanceController/ethereum/balanceController');
const balanceControllerPolygon = require('../controllers/balanceController/polygon/balanceController');
const balanceControllerOptimism = require('../controllers/balanceController/optimism/balanceController');
const balanceControllerRinkeby = require('../controllers/balanceController/rinkeby/balanceController');

const router = express.Router();

router.route('/ethereum/rate').get(balanceControllerEthereum.getRate);
router.route('/ethereum/:address').get(balanceControllerEthereum.getBalance);

router.route('/polygon/rate').get(balanceControllerPolygon.getRate);
router.route('/polygon/:address').get(balanceControllerPolygon.getBalance);

router.route('/optimism/rate').get(balanceControllerOptimism.getRate);
router.route('/optimism/:address').get(balanceControllerOptimism.getBalance);

router.route('/rinkeby/rate').get(balanceControllerEthereum.getRate);
router.route('/rinkeby/:address').get(balanceControllerRinkeby.getBalance);
// router.route('/tokens/:url').get(balanceController.getTokenImg);
module.exports = router;
