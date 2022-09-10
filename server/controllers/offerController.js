const Offer = require('../models/offerModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllOffers = catchAsync(async (req, res, next) => {
  const offers = await Offer.find();
  //TODO: add pagination
  res.status(201).json({
    status: 'success',
    data: {
      offers: offers,
    },
  });
});

exports.createOffer = catchAsync(async (req, res, next) => {
  const offerBody = {
    user: req.user._id,
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
      newOffer: newOffer,
    },
  });
});
