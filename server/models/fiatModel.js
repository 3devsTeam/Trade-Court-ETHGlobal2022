const mongoose = require('mongoose');

const fiatSchema = new mongoose.Schema({
  name: {
    type: String,
    lower: true,
    required: true,
    unique: true,
  },
  ticker: {
    type: String,
    uppercase: true,
    required: true,
    minlenght: 2,
    maxlenght: 4,
    unique: true,
  },
  banks: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Bank',
      required: [true, 'Bank is empty'],
    },
  ],
  regions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Region',
      required: [true, 'Region is empty'],
    },
  ],
  logoUrl: {
    type: String,
    required: true,
  },
});

const Fiat = mongoose.model('Fiat', fiatSchema);
module.exports = Fiat;
