const mongoose = require('mongoose');
const conflictSchema = new mongoose.Schema(
  {
    reason: {
      type: String,
      require: true,
      minLenght: 10,
      maxLength: 120,
    },
    description: {
      type: String,
      require: true,
      minLenght: 10,
      maxLength: 1000,
    },
    proofs: [
      {
        type: String,
        require: true,
      },
    ],
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    defendant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      require: true,
      unique: true, //BUG: не проверяет на уникальность починить
    },
  },
  {
    timestamps: true,
  }
);

const Conflict = mongoose.model('Conflict', conflictSchema);
module.exports = Conflict;
