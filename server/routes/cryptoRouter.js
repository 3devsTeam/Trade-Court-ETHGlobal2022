const express = require('express');
const cryptoController = require('../controllers/cryptoController');

const router = express.Router();

router
  .route('/')
  .get(cryptoController.getAllCrypto)
  .post(cryptoController.createCrypto);

module.exports = router;
