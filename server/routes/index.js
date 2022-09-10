const express = require('express');
const bankRouter = require('./bankRouter');
const regionRouter = require('./regionRouter');
const fiatRouter = require('./fiatRouter');
const cryptoRouter = require('./cryptoRouter');
const offerRouter = require('./offerRouter');
const userRouter = require('./userRouter');
const balanceRouter = require('./balanceRouter');

const router = express.Router();

router.use('/bank', bankRouter);
router.use('/region', regionRouter);
router.use('/fiat', fiatRouter);
router.use('/crypto', cryptoRouter);
router.use('/offer', offerRouter);
router.use('/user', userRouter);
router.use('/balance', balanceRouter);

module.exports = router;
