const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
  name: {
    type: String,
    lower: true,
    required: true,
    unique: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
});

const Region = mongoose.model('Region', regionSchema);
module.exports = Region;
