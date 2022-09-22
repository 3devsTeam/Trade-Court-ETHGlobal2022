const Offer = require("../models/offerModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await User.find();

  res.status(201).json({
    message: "success",
    data: {
      allUsers: allUsers,
    },
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await Offer.find({
    $or: [{ maker: req.user._id }, { "room.taker": req.user._id }],
  }).populate("crypto fiat payMethods.bank");

  res.status(201).json({
    message: "success",
    user,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    message: "success",
    data: {
      newUser: newUser,
    },
  });
});
