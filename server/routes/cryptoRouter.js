const express = require('express');
const authController = require('../controllers/authController');
const cryptoController = require('../controllers/cryptoController');

const router = express.Router();

router.get('/', cryptoController.getAllCrypto);

router.use(authController.protect);
router.use(authController.accessOnly('admin'));
router.post('/', cryptoController.createCrypto);

module.exports = router;
