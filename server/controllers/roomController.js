const Offer = require("../models/offerModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.takerSent = catchAsync(async (req, res, next) => {
  const offer = await Offer.findById(req.params.id);
  if (!offer) {
    return next(new AppError("No such offer", 404));
  }
  if (offer.room.taker) {
    if (offer.room.taker.toString() != req.user._id.toString()) {
      return next(new AppError("You dont have access", 403));
    }
  } else {
    return next(new AppError("You dont have access", 403));
  }
  if (offer.room.stage != "waiting taker") {
    return next(new AppError("It's not your turn", 400));
  }
  const newOffer = await Offer.findByIdAndUpdate(
    req.params.id,
    {
      $set: { "room.stage": "taker sent" },
    },
    { new: true }
  );
  res.status(200).json({
    message: "success",
    newOffer,
  });
});

exports.makerRecieved = catchAsync(async (req, res, next) => {
  const offer = await Offer.findById(req.params.id);
  if (!offer) {
    return next(new AppError("No such offer", 404));
  }
  if (offer.maker.toString() != req.user._id.toString()) {
    return next(new AppError("You dont have access", 403));
  }
  if (offer.room.stage != "taker sent") {
    return next(new AppError("It's not your turn", 400));
  }
  const newOffer = await Offer.findByIdAndUpdate(
    req.params.id,
    {
      $set: { "room.stage": "maker recived" },
    },
    { new: true }
  );
  res.status(200).json({
    message: "success",
    newOffer,
  });
});

exports.takerClaimed = catchAsync(async (req, res, next) => {
  const offer = await Offer.findById(req.params.id);
  if (!offer) {
    return next(new AppError("No such offer", 404));
  }
  if (offer.room.taker) {
    if (offer.room.taker.toString() != req.user._id.toString()) {
      return next(new AppError("You dont have access", 403));
    }
  } else {
    return next(new AppError("You dont have access", 403));
  }
  if (offer.room.stage != "maker recived") {
    return next(new AppError("It's not your turn", 400));
  }
  const newAmount = offer.amount - offer.room.amount;
  const newQuantity = offer.quantity - offer.room.amount / offer.unitPrice;
  const newOffer = await Offer.findByIdAndUpdate(
    req.params.id,
    {
      room: { starge: "no taker" },
      $set: { amount: newAmount, quantity: newQuantity },
    },
    { new: true }
  );
  res.status(200).json({
    message: "success",
    newOffer,
  });
});
