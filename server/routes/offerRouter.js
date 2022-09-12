const express = require('express');
const authController = require('../controllers/authController');
const offerController = require('../controllers/offerController');

const router = express.Router();

router.get('/', offerController.getAllOffers);

router.use(authController.protect);
router.post('/', offerController.createOffer);
router.get('/:id', offerController.getOffer);
router.patch('/:id', offerController.joinOffer);

module.exports = router;
