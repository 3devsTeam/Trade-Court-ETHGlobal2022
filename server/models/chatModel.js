const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
      },
    ],
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
