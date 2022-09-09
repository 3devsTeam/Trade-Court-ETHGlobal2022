const express = require('express');
const fiatController = require('../controllers/fiatController');

const router = express.Router();

router
  .route('/')
  .get(fiatController.getAllFiat)
  .post(fiatController.createFiat);

module.exports = router;
