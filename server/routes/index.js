const express = require('express');
const bankRouter = require('./bankRouter');
const regionRouter = require('./regionRouter');

const router = express.Router();

router.use('/bank', bankRouter);
router.use('/region', regionRouter);

module.exports = router;
