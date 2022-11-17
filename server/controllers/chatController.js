const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// exports.getAllChats = catchAsync(async (req, res, next) => {
//   const allChats = await Chat.find();
//   if (!allChats) {
//     return next(new AppError(`no chats`, 404));
//   }
//   res.status(200).json({
//     message: 'success',
//     allChats,
//   });
// });

// exports.createChat = catchAsync(async (maker, taker, room) => {
//   const chatOptions = {
//     maker,
//     taker,
//     room,
//   };
//   const newChat = await Chat.create(chatOptions);
//   return true;
// });

// exports.joinChat = catchAsync(async (req, res, next) => {
//   const chat = await Chat.findById(req.params.id);
//   if (!chat) {
//     return next(new AppError('No such offer', 404));
//   }
//   if (chat.maker && chat.taker) {
//     return next(new AppError('chat is full', 403));
//   }
//   if (chat.maker.toString() != req.user._id.toString()) {
//     if (chat.taker) {
//       if (chat.taker.toString() == req.user._id.toString()) {
//         return next(new AppError('You already in this room', 403));
//       }
//     }
//   } else {
//     return next(new AppError('You already in this room', 403));
//   }
//   await Chat.findByIdAndUpdate(req.params.id, {
//     $set: { taker: req.user._id },
//   });
//   res.status(200).json({
//     message: 'success',
//   });
// });

exports.getChat = catchAsync(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id);
  if (!chat) {
    return next(new AppError(`no chat with id ${req.params.id}`, 404));
  }
  if (chat.maker.toString() != req.user._id.toString()) {
    if (chat.taker) {
      if (chat.taker.toString() != req.user._id.toString()) {
        return next(new AppError('You dont have access', 403));
      }
    } else {
      return next(new AppError('You dont have access', 403));
    }
  }
  const messages = await Message.find({ chat: req.params.id });
  res.status(200).json({
    message: 'success',
    userId: req.user._id,
    messages,
  });
});

exports.sendMessage = catchAsync(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id);
  if (!chat) {
    return next(new AppError(`no chat with id ${req.params.id}`, 404));
  }
  if (chat.maker.toString() != req.user._id.toString()) {
    if (chat.taker) {
      if (chat.taker.toString() != req.user._id.toString()) {
        return next(new AppError('You dont have access', 403));
      }
    } else {
      return next(new AppError('You dont have access', 403));
    }
  }
  const msg = {
    sender: req.user._id,
    content: req.body.content,
    chat: req.params.id,
  };
  await Message.create(msg);
  res.status(201).json({
    message: 'success',
  });
});

exports.deleteChat = catchAsync(async (req, res, next) => {
  await Chat.findOneAndDelete({ _id: req.params.id });
  res.status(200).json({
    message: 'success',
  });
});
