const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, 'address is empty'],
  },
  offerType: {
    type: String,
    enum: ['buy', 'sell'],
    required: [true, 'offerType is empty'],
  },
  payMethods: [
    {
      currentBank: {
        type: mongoose.Schema.ObjectId,
        ref: 'Banks',
        required: [true, 'Bank is empty'],
      },
      cardNumber: {
        type: String,
        minLenght: 4,
        required: [true, 'card Number is empty'],
      },
      activeRegion: {
        type: String,
        required: [true, 'activeRegion is empty'],
      },
      paymentDescription: {
        type: String,
        maxLenght: 600,
      },
    },
  ],
  fiat: {
    type: mongoose.Schema.ObjectId,
    ref: 'Fiat',
    required: [true, 'Fiat is empty'],
  },
  unitPrice: {
    type: Number,
    min: [1, 'unitPrice very small'],
    required: [true, 'unitPrice is empty'],
  },
  amount: {
    type: Number,
    required: [true, 'amount is empty'],
  },
  quantity: {
    type: Number,
    min: [0, 'quantity very small'],
    required: [true, 'quantity is empty'],
  },
  orderLimit: [
    {
      type: Number,
      required: [true, 'orderLimit is empty'],
    },
  ],
  crypto: {
    type: mongoose.Schema.ObjectId,
    ref: 'Crypto',
    required: [true, 'Crypto is empty'],
  },
  offerComment: {
    type: String,
    maxLenght: 600,
  },
});

const Offer = mongoose.model('Offer', offerSchema);
module.exports = Offer;
