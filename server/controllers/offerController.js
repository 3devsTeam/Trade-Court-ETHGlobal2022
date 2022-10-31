const Offer = require('../models/offerModel');
const Room = require('../models/roomModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllOffers = catchAsync(async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const amountReq = +req.query.search?.amount;
  const fiatReq = req.query.search?.fiat || '63209e46243d0ba1ebc616f6';
  const cryptoReq = req.query.search?.crypto || '6303a23c229dc6a74b1b1191';
  const offerTypeReq = req.query.search?.offerType || 'buy';
  const regionReq = req.query.search?.region;
  let banksReq = null;
  if (req.query.search?.banks) {
    banksReq = req.query.search?.banks.split(',');
  }

  let match = {
    offerType: offerTypeReq,
    fiat: fiatReq,
    crypto: cryptoReq,
  };
  if (amountReq) {
    match.minLimit = { $lte: amountReq };
    match.maxLimit = { $gte: amountReq };
  }
  if (banksReq) {
    const banksArr = banksReq.map((el) => {
      return { 'payMethods.bank': el };
    });
    match.$or = banksArr;
  }
  if (regionReq) {
    match['payMethods.region'] = regionReq;
  }

  const offers = await Offer.find(match)
    .populate([
      { path: 'crypto' },
      { path: 'payMethods', populate: { path: 'bank' } },
      { path: 'fiat', select: '-banks -regions' },
      { path: 'maker' },
    ])
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ unitPrice: 1 });

  // const offers = await Offer.aggregate([
  //   {
  //     $lookup: {
  //       from: 'Crypto',
  //       localField: 'crypto',
  //       foreignField: '_id',
  //       as: 'crypto',
  //     },
  //   },
  // ]);

  res.status(201).json({
    message: 'success',
    data: {
      offers,
    },
  });
});

exports.getRoom = catchAsync(async (req, res, next) => {
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
    minLimit: req.body.minLimit,
    maxLimit: req.body.maxLimit,
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
