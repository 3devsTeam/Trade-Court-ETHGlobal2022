const Offer = require('../models/offerModel');
const Room = require('../models/roomModel');
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
  const user = await User.findById(req.user._id);
  res.status(201).json({
    message: 'success',
    user,
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
