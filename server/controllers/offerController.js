const Offer = require("../models/offerModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllOffers = catchAsync(async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const offers = await Offer.find()
    .find({ "room.stage": { $eq: "no taker" } })
    .sort({ unitPrice: 1 })
    .populate("crypto payMethods.bank fiat maker")
    .limit(limit)
    .skip((page - 1) * limit);

  res.status(201).json({
    message: "success",
    data: {
      offers,
    },
  });
});

exports.getOffer = catchAsync(async (req, res, next) => {
  let offer = await Offer.findById(req.params.id).populate(
    "crypto fiat payMethods.bank payMethods.region maker room.taker"
  );
  console.log(offer.room);
  if (!offer) {
    return next(new AppError("No such offer", 404));
  }
  let role = "restricted";
  if (offer.maker._id.toString() != req.user._id.toString()) {
    if (offer.room.taker) {
      if (offer.room.taker._id.toString() != req.user._id.toString()) {
        return next(new AppError("You dont have access", 403));
      } else {
        role = "taker";
      }
    } else {
      return next(new AppError("You dont have access", 403));
    }
  } else {
    role = "maker";
  }
  offer = JSON.parse(JSON.stringify(offer));
  offer.role = role;
  res.status(201).json({
    message: "success",
    data: {
      offer,
    },
  });
});

exports.joinOffer = catchAsync(async (req, res, next) => {
  const offer = await Offer.findById(req.params.id);
  if (!offer) {
    return next(new AppError("No such offer", 404));
  }
  if (offer.maker && offer.taker) {
    return next(new AppError("Offer is full", 403));
  }
  if (offer.maker.toString() != req.user._id.toString()) {
    if (offer.room.taker) {
      if (offer.room.taker.toString() == req.user._id.toString()) {
        return next(new AppError("You already in this room", 403));
      }
    }
  } else {
    return next(new AppError("You already in this room", 403));
  }
  if (offer.room.stage != "no taker") {
    return next(new AppError("It's not your turn", 400));
  }
  if (
    req.body.amount < offer.orderLimit[0] ||
    req.body.amount > offer.orderLimit[1] ||
    !req.body.amount
  ) {
    return next(new AppError("Amount is invalid", 400));
  }
  if (offer.amount - req.body.amount < 0) {
    return next(new AppError("Amount is too big", 400));
  }

  const resp = await Offer.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        "room.taker": req.user._id,
        "room.stage": "waiting taker",
        "room.amount": req.body.amount,
        "room.createdAt": new Date(),
      },
    },
    { new: true }
  );
  res.status(200).json({
    message: "success",
    resp,
  });
});

exports.leaveOffer = catchAsync(async (req, res, next) => {
  const offer = await Offer.findById(req.params.id);
  if (!offer) {
    return next(new AppError("No such offer", 404));
  }
  if (offer.maker.toString() == req.user._id.toString()) {
    return next(new AppError("You cant leave this room as owner", 403));
  } else {
    if (offer.room.taker) {
      if (offer.room.taker.toString() != req.user._id.toString()) {
        return next(new AppError("You cant leave this room", 403));
      }
    } else {
      return next(new AppError("You cant leave this room", 403));
    }
  }

  await Offer.findOneAndUpdate(
    { _id: req.params.id },
    {
      room: { starge: "no taker" },
    }
  );

  res.status(200).json({
    message: "success",
  });
});

exports.createOffer = catchAsync(async (req, res, next) => {
  const offerBody = {
    maker: req.user._id,
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
    room: { roomId: req.body.roomId },
  };

  const newOffer = await Offer.create(offerBody);

  res.status(201).json({
    message: "success",
    data: {
      newOffer,
    },
  });
});

exports.deleteOffer = catchAsync(async (req, res, next) => {
  const offer = await Offer.findById(req.params.id);
  if (!offer) {
    return next(new AppError("No such offer", 403));
  }
  if (offer.maker.toString() != req.user._id.toString()) {
    return next(new AppError("You dont have access", 403));
  }
  if (offer.room.stage != "no taker") {
    return next(new AppError("You cant delete with active taker", 403));
  }
  await Offer.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "success",
  });
});
