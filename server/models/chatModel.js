const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    maker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    taker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rooms',
      require: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
