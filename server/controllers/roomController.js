const Offer = require('../models/offerModel');
const Room = require('../models/roomModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getMyRooms = catchAsync(async (req, res, next) => {
  const rooms = await Room.aggregate([
    {
      $lookup: {
        from: 'offers',
        localField: 'offer',
        foreignField: '_id',
        pipeline: [
          {
            $project: {
              'payMethods.bank': 1,
              fiat: 1,
              type: 1,
              crypto: 1,
              maker: 1,
            },
          },
        ],
        as: 'offer',
      },
    },
    {
      $match: {
        $or: [{ 'offer.maker': req.user._id }, { taker: req.user._id }],
      },
    },
    {
      $lookup: {
        from: 'banks',
        localField: 'offer.payMethods.bank',
        foreignField: '_id',
        as: 'banks',
      },
    },
    {
      $lookup: {
        from: 'cryptos',
        localField: 'offer.crypto',
        foreignField: '_id',
        as: 'crypto',
      },
    },
    {
      $lookup: {
        from: 'fiats',
        localField: 'offer.fiat',
        foreignField: '_id',
        pipeline: [
          {
            $project: {
              _id: 1,
              name: 1,
              ticker: 1,
            },
          },
        ],
        as: 'fiat',
      },
    },
  ]);
  res.status(201).json({
    message: 'success',
    rooms,
  });
});

exports.joinRoom = catchAsync(async (req, res, next) => {
  const offer = await Offer.findById(req.params.id);
  if (!offer) {
    return next(new AppError('No such offer', 404));
  }
  if (offer.maker.toString() == req.user._id.toString()) {
    return next(new AppError('You can not join your offer', 403));
  }
  const room = await Room.findOne({
    offer: req.params.id,
    taker: req.user._id,
  });
  if (room) {
    return next(new AppError('You have already joined this room', 403));
  }
  if (
    req.body.amount < offer.minLimit ||
    req.body.amount > offer.maxLimit ||
    !req.body.amount
  ) {
    return next(new AppError('Amount is invalid', 400));
  }
  if (offer.amount - req.body.amount < 0) {
    return next(new AppError('Amount is too big', 400));
  }
  const newRoom = await Room.create({
    offer: req.params.id,
    taker: req.user._id,
    amount: req.body.amount,
    unitPrice: offer.unitPrice,
    takerNumber: offer.takerNumber,
    createdAt: new Date(),
  });
  await Offer.findByIdAndUpdate(req.params.id, {
    $inc: {
      amount: req.body.amount * -1,
      quantity: (req.body.amount / offer.unitPrice) * -1,
      takerNumber: 1,
    },
  });
  res.status(200).json({
    message: 'success',
    newRoom,
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

exports.takerSent = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.params.id);
  if (!room) {
    return next(new AppError('No such room', 404));
  }
  if (room.taker.toString() != req.user._id.toString()) {
    return next(new AppError('You dont have access', 403));
  }
  if (room.stage != 'waiting taker') {
    return next(new AppError("It's not your turn", 400));
  }
  await Room.findByIdAndUpdate(req.params.id, {
    $set: { stage: 'taker send' },
  });
  res.status(200).json({
    message: 'success',
  });
});

exports.makerRecieved = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.params.id).populate('offer');
  if (!room) {
    return next(new AppError('No such room', 404));
  }
  if (room.offer.maker.toString() != req.user._id.toString()) {
    return next(new AppError('You dont have access', 403));
  }
  if (room.stage != 'taker send') {
    return next(new AppError("It's not your turn", 400));
  }
  await Room.findByIdAndUpdate(req.params.id, {
    $set: { stage: 'maker recieved' },
  });
  res.status(200).json({
    message: 'success',
  });
});

exports.takerClaimed = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.params.id).populate('offer');
  if (!room) {
    return next(new AppError('No such room', 404));
  }
  if (room.taker.toString() != req.user._id.toString()) {
    return next(new AppError('You dont have access', 403));
  }
  if (room.stage != 'maker recieved') {
    return next(new AppError("It's not your turn", 400));
  }
  await Room.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: 'success',
  });
});

exports.leaveRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.params.id).populate('offer');
  if (!room) {
    return next(new AppError('No such room', 404));
  }
  if (
    room.taker.toString() != req.user._id.toString() ||
    room.stage != 'waiting taker'
  ) {
    return next(new AppError('You cant leave this room', 403));
  }
  console.log(room.amount, room.amount / room.unitPrice);
  await Offer.findByIdAndUpdate(room.offer, {
    $inc: { amount: room.amount, quantity: room.amount / room.unitPrice },
  });
  await Room.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: 'success',
  });
});
