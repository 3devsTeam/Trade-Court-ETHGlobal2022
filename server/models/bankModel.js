const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
  name: {
    type: String,
    lower: true,
    required: true,
    unique: true,
  },
});

const Bank = mongoose.model('Bank', bankSchema);
module.exports = Bank;
