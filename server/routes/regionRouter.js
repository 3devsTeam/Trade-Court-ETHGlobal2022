const express = require('express');
const regionController = require('../controllers/regionController');

const router = express.Router();

router
  .route('/')
  .get(regionController.getAllRegions)
  .post(regionController.createRegion);

module.exports = router;
