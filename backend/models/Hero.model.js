const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  headline: { type: String, required: true, default: 'Reliable Delivery. Professional Service. Every Time.' },
  subheadline: { type: String, default: 'Medical, Legal, Automotive & Business Courier Services Across the DFW Metroplex' },
  ctaText: { type: String, default: 'Request a Quote' },
  ctaSecondaryText: { type: String, default: 'Our Services' },
  backgroundImage: {
    url: String,
    public_id: String,
  },
  stats: [
    {
      value: String,
      label: String,
    }
  ],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Hero', heroSchema);
