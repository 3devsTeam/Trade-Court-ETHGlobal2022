const Bank = require('../models/bankModel');

exports.getAllBanks = async (req, res, next) => {
  const allBanks = await Bank.find();

  res.status(201).json({
    status: 'success',
    data: {
      allBanks: allBanks,
    },
  });
};

exports.createBank = async (req, res, next) => {
  const newBank = await Bank.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newBank: newBank,
    },
  });
};
