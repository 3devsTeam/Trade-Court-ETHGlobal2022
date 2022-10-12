const Offer = require('../models/offerModel');
const Room = require('../models/roomModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllOffers = catchAsync(async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const offers = await Offer.find()
    .find({ 'room.stage': { $eq: 'no taker' } })
    .sort({ unitPrice: 1 })
    .populate('crypto payMethods.bank fiat maker')
    .limit(limit)
    .skip((page - 1) * limit);

  res.status(201).json({
    message: 'success',
    data: {
      offers,
    },
  });
});

exports.getOffer = catchAsync(async (req, res, next) => {
  let room = await Room.findById(req.params.id).populate([
    {
      path: 'offer',
      populate: [
        {
          path: 'maker',
        },
        {
          path: 'fiat',
          select: '-banks -regions',
        },
        {
          path: 'crypto',
        },
        {
          path: 'payMethods.bank',
        },
        {
          path: 'payMethods.region',
        },
      ],
    },
    { path: 'taker' },
  ]);
  if (!room) {
    return next(new AppError('No such offer', 404));
  }
  let role = 'restricted';
  if (room.offer.maker._id.toString() != req.user._id.toString()) {
    if (room.taker._id.toString() != req.user._id.toString()) {
      return next(new AppError('You dont have access', 403));
    } else {
      role = 'taker';
    }
  } else {
    role = 'maker';
  }
  room = JSON.parse(JSON.stringify(room));
  room.role = role;
  res.status(201).json({
    message: 'success',
    data: {
      room,
    },
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
    message: 'success',
    data: {
      newOffer,
    },
  });
});

exports.deleteOffer = catchAsync(async (req, res, next) => {
  const offer = await Offer.findById(req.params.id);
  if (!offer) {
    return next(new AppError('No such offer', 403));
  }
  if (offer.maker.toString() != req.user._id.toString()) {
    return next(new AppError('You dont have access', 403));
  }
  const rooms = await Room.find({
    offer: req.params.id,
  });
  console.log(rooms);
  if (rooms.length != 0) {
    return next(new AppError('You cant delete offer with active rooms', 403));
  }
  await Offer.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: 'success',
  });
});
