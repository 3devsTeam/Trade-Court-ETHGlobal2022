const express = require('express');
const authController = require('../controllers/authController');
const fiatController = require('../controllers/fiatController');

const router = express.Router();

router.get('/', fiatController.getAllFiat);

router.use(authController.protect);
router.use(authController.accessOnly('admin'));
router.post('/', fiatController.createFiat);

module.exports = router;
