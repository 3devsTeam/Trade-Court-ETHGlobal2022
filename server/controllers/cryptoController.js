const Crypto = require('../models/cryptoModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllCrypto = catchAsync(async (req, res, next) => {
  const allCrypto = await Crypto.find();

  res.status(201).json({
    message: 'success',
    data: {
      allCrypto: allCrypto,
    },
  });
});

exports.createCrypto = catchAsync(async (req, res, next) => {
  const newCrypto = await Crypto.create(req.body);
  res.status(201).json({
    message: 'success',
    data: {
      newCrypto: newCrypto,
    },
  });
});
