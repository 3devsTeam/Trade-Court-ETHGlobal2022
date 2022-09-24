const Ethereum = require('../models/cryptoModels/ethereumModel');
const Optimism = require('../models/cryptoModels/optimismModel');
const Polygon = require('../models/cryptoModels/polygonModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllCrypto = catchAsync(async (req, res, next) => {
  const allCrypto = await Ethereum.find();

  res.status(201).json({
    message: 'success',
    data: {
      allCrypto: allCrypto,
    },
  });
});

exports.createCrypto = catchAsync(async (req, res, next) => {
  const newCrypto = await Ethereum.create(req.body);
  res.status(201).json({
    message: 'success',
    data: {
      newCrypto: newCrypto,
    },
  });
});
