const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({
    reviews,
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const review = await Review.create({
    user: req.body.user,
    rating: req.body.rating,
  });
  res.status(200).json({
    review,
  });
});
