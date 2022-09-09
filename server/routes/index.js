const express = require('express');
const bankRouter = require('./bankRouter');

const router = express.Router();

router.use('/bank', bankRouter);

module.exports = router;
