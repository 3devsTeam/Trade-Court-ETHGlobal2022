const Offer = require('../models/offerModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllOffers = catchAsync(async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  console.log(page, limit);
  const offers = await Offer.find()
    .sort({ unitPrice: 1 })
    .populate('crypto')
    .limit(limit)
    .skip((page - 1) * limit);

  res.status(201).json({
    status: 'success',
    data: {
      offers,
    },
  });
});

exports.getOffer = catchAsync(async (req, res, next) => {
  const offer = await Offer.findById(req.params.id);
  if (!offer) {
    return next(new AppError('No such offer', 404));
  }
  if (!offer.users.includes(req.user._id)) {
    return next(new AppError('You dont have access', 403));
  }
  res.status(201).json({
    status: 'success',
    data: {
      offer,
    },
  });
});

exports.createOffer = catchAsync(async (req, res, next) => {
  const offerBody = {
    users: [req.user._id],
    offerType: req.body.offerType,
    payMethods: req.body.payMethods,
    fiat: req.body.fiat,
    unitPrice: req.body.unitPrice,
    amount: req.body.amount,
    quantity: req.body.quantity,
    orderLimit: req.body.orderLimit,
    timeLimit: req.body.timeLimit,
    crypto: req.body.crypto,
    offerComment: req.body.offerComment,
  };

  const newOffer = await Offer.create(offerBody);

  res.status(201).json({
    status: 'success',
    data: {
      newOffer,
    },
  });
});
