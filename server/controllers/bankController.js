const Bank = require('../models/bankModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllBanks = catchAsync(async (req, res, next) => {
  const allBanks = await Bank.find();

  res.status(201).json({
    message: 'success',
    data: {
      allBanks: allBanks,
    },
  });
});

exports.createBank = catchAsync(async (req, res, next) => {
  const newBank = await Bank.create(req.body);

  res.status(201).json({
    message: 'success',
    data: {
      newBank: newBank,
    },
  });
});
