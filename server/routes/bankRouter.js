const express = require('express');
const authController = require('../controllers/authController');
const bankController = require('../controllers/bankController');

const router = express.Router();

router.get('/', bankController.getAllBanks);

router.use(authController.protect);
router.use(authController.accessOnly('admin'));
router.post('/', bankController.createBank);

module.exports = router;
