const Conflict = require('../models/conflictModel');
const catchAsync = require('../utils/catchAsync');
const ConflictMessage = require('../models/conflictMessageModel');
const AppError = require('../utils/appError');
const Room = require('../models/roomModel');

exports.createConflict = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.params.roomId).populate('offer');
  if (!room) {
    return next(new AppError('No such room', 400));
  }
  if (
    req.user._id.toString() !== room.taker.toString() &&
    req.user._id.toString() !== room.offer.maker.toString()
  ) {
    return next(new AppError('No access', 400));
  }
  let defendant;
  if (req.user._id.toString() == room.taker.toString()) {
    defendant = room.offer.maker.toString();
  } else {
    defendant = room.taker.toString();
  }
  await Conflict.create({
    reason: req.body.reason,
    description: req.body.description,
    proofs: req.body.proofs,
    applicant: req.user._id,
    defendant: defendant,
    room: req.params.roomId,
  });
  res.status(200).json({
    message: 'success',
  });
});

exports.getAllConflicts = catchAsync(async (req, res, next) => {
  const conflicts = await Conflict.find();
  res.status(200).json({
    message: 'success',
    conflicts,
  });
});

exports.getMyConflicts = catchAsync(async (req, res, next) => {
  const conflicts = await Conflict.find({
    $or: [{ applicant: req.user._id }, { defendant: req.user._id }],
  });
  res.status(200).json({
    message: 'success',
    conflicts,
  });
});

exports.sendMessage = catchAsync(async (req, res, next) => {
  const conflict = await Conflict.findById(req.params.conflictId);
  if (!conflict) {
    return next(new AppError('No such conflict'));
  }
  if (
    req.user._id.toString() !== conflict.applicant.toString() &&
    req.user._id.toString() !== conflict.defendant.toString()
  ) {
    return next(new AppError('No access', 400));
  }
  if (!req.body.content) {
    return next(new AppError('Empty message'));
  }
  const msg = {
    sender: req.user._id,
    content: req.body.content,
    conflict: req.params.conflictId,
  };
  await ConflictMessage.create(msg);
  res.status(201).json({
    message: 'success',
  });
});

exports.allMessages = catchAsync(async (req, res, next) => {
  const conflict = await Conflict.findById(req.params.conflictId);
  if (!conflict) {
    return next(new AppError('No such conflict'));
  }
  if (
    req.user._id.toString() !== conflict.applicant.toString() &&
    req.user._id.toString() !== conflict.defendant.toString()
  ) {
    return next(new AppError('No access', 400));
  }
  const messages = await ConflictMessage.find({
    conflict: req.params.conflictId,
  });
  res.status(201).json({
    message: 'success',
    messages,
  });
});
