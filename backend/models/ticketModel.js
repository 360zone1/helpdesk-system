const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, 'Please add a subject'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    status: {
      type: String,
      enum: ['open', 'in-progress', 'closed'],
      default: 'open',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);