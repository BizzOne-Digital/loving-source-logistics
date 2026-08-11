const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  pickupLocation: { type: String, required: true },
  deliveryLocation: { type: String, required: true },
  deliveryType: {
    type: String,
    enum: ['medical-supply', 'specimen', 'prescription', 'equipment', 'auto-parts', 'legal-docs', 'b2b', 'same-day', 'rush', 'scheduled', 'other'],
    required: true
  },
  dateTimeNeeded: { type: Date },
  isRecurring: { type: Boolean, default: false },
  specialHandling: { type: String },
  status: {
    type: String,
    enum: ['new', 'reviewed', 'quoted', 'accepted', 'declined'],
    default: 'new'
  },
  adminNotes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Quote', quoteSchema);
