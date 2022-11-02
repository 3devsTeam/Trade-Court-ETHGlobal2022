//TODO: мб сделать типо отдельный локумент для чата и сообщение чтобы по структуре было лучше
const mongoose = require('mongoose');

const conflictMessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    conflict: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conflict',
    },
  },
  {
    timestamps: true,
  }
);

const ConflictMessage = mongoose.model(
  'ConflictMessage',
  conflictMessageSchema
);
module.exports = ConflictMessage;
