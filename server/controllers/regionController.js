const Region = require('../models/regionModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllRegions = catchAsync(async (req, res, next) => {
  const allRegions = await Region.find();

  res.status(201).json({
    message: 'success',
    data: {
      allRegions: allRegions,
    },
  });
});

exports.createRegion = catchAsync(async (req, res, next) => {
  const newRegion = await Region.create(req.body);
  res.status(201).json({
    message: 'success',
    data: {
      newRegion: newRegion,
    },
  });
});
