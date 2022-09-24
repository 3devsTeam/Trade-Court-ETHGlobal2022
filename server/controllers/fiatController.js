const Fiat = require('../models/fiatModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllFiat = catchAsync(async (req, res, next) => {
  const allFiat = await Fiat.find().populate({ path: 'banks regions' });

  res.status(201).json({
    message: 'success',
    data: {
      allFiat: allFiat,
    },
  });
});

exports.createFiat = catchAsync(async (req, res, next) => {
  const newFiat = await Fiat.create(req.body);
  res.status(201).json({
    message: 'success',
    data: {
      newFiat: newFiat,
    },
  });
});
