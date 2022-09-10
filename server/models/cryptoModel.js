const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  chainId: {
    type: Number,
    required: true,
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

const Crypto = mongoose.model('Crypto', cryptoSchema);
module.exports = Crypto;
