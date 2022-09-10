const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');

exports.login = catchAsync(async (req, res, next) => {
  const address = req.body.address;
  let user = await User.findOne({ address });
  if (!user) {
    user = await User.create({ address: address });
    console.log(`new user ${address}`);
  }
  res.status(200).json({
    msg: 'success',
    data: user,
  });
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('No permission', 403));
    }
    next();
  };
};
