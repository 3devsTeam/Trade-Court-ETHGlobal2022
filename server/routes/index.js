const express = require('express');
const bankRouter = require('./bankRouter');
const regionRouter = require('./regionRouter');
const fiatRouter = require('./fiatRouter');
const cryptoRouter = require('./cryptoRouter');

const router = express.Router();

router.use('/bank', bankRouter);
router.use('/region', regionRouter);
router.use('/fiat', fiatRouter);
router.use('/crypto', cryptoRouter);

module.exports = router;
