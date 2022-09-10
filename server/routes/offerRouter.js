const express = require('express');
const offerController = require('../controllers/offerController');

const router = express.Router();

router
  .route('/')
  .get(offerController.getAllOffers)
  .post(offerController.createOffer);

module.exports = router;
