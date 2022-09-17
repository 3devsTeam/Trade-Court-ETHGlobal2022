const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await User.find();

  res.status(201).json({
    message: 'success',
    data: {
      allUsers: allUsers,
    },
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: req.user._id,
      },
    },
    {
      $lookup: {
        from: 'offers',
        localField: '_id',
        foreignField: 'maker',
        as: 'offers',
      },
    },
  ]);
  res.status(201).json({
    message: 'success',
    data: {
      user,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    message: 'success',
    data: {
      newUser: newUser,
    },
  });
});
