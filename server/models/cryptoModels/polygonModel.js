const mongoose = require('mongoose');

const polygonSchema = new mongoose.Schema({
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

const Polygon = mongoose.model('polygon', polygonSchema);
module.exports = Polygon;
