const express = require('express');
const bankController = require('../controllers/bankController');

const router = express.Router();

router
  .route('/')
  .get(bankController.getAllBanks)
  .post(bankController.createBank);

module.exports = router;
