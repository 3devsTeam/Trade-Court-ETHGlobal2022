const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  offer: {
    type: mongoose.Schema.ObjectId,
    ref: 'Offer',
    required: true,
  },
  taker: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  stage: {
    type: String,
    enum: ['waiting taker', 'taker send', 'maker recieved', 'taker claimed'],
    default: 'waiting taker',
    required: true,
  },
  amount: {
    type: Number,
    min: 0,
    required: true,
  },
  roomId: {
    type: String,
    required: [true, 'roomId is empty'],
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
