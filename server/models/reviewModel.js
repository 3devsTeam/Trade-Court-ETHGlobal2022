const mongoose = require('mongoose');
const User = require('./userModel');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'User is empty'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
});

reviewSchema.statics.calcAverageRatings = async function (userId) {
  const stats = await this.aggregate([
    {
      $match: { user: userId },
    },
    {
      $group: {
        _id: '$user',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  // console.log(stats);

  if (stats.length > 0) {
    await User.findByIdAndUpdate(userId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await User.findByIdAndUpdate(userId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post('save', function () {
  // this points to current review
  this.constructor.calcAverageRatings(this.user);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.clone().findOne(); // console.log(this.r);
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  // await this.findOne(); does NOT work here, query has already executed
  await this.r.constructor.calcAverageRatings(this.r.user);
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
