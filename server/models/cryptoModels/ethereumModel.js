const mongoose = require('mongoose');

const ethereumSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  decimals: {
    type: Number,
    required: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
});

const Ethereum = mongoose.model('ethereum', ethereumSchema);
module.exports = Ethereum;
