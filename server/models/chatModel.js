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
    offer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offer',
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
