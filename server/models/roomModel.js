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
  unitPrice: {
    type: Number,
    min: [1, 'unitPrice very small'],
    required: [true, 'unitPrice is empty'],
  },
  takerNumber: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
