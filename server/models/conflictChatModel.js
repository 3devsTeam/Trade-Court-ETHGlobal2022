const mongoose = require('mongoose');

const conflictChatSchema = new mongoose.Schema(
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
    conflict: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'conflict',
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const ConflictChat = mongoose.model('ConflictChat', conflictChatSchema);
module.exports = ConflictChat;
