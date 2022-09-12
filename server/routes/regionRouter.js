const express = require('express');
const authController = require('../controllers/authController');
const regionController = require('../controllers/regionController');

const router = express.Router();

router.get('/', regionController.getAllRegions);

router.use(authController.protect);
router.use(authController.accessOnly('admin'));
router.post('/', regionController.createRegion);

module.exports = router;
