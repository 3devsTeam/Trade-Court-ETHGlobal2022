const express = require('express');
const authController = require('../controllers/authController');
const offerController = require('../controllers/offerController');

const router = express.Router();

router.get('/', offerController.getAllOffers);

router.use(authController.protect);
router.post('/', offerController.createOffer);

module.exports = router;
