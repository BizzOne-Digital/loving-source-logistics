const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'Loving Source Logistics' },
  tagline: { type: String, default: 'Reliable Delivery. Professional Service. Every Time.' },
  phone: { type: String, default: '1-866-592-3118' },
  email: { type: String, default: 'info@lovingsourcelogistics.com' },
  website: { type: String },
  address: { type: String },
  serviceAreas: [String],
  businessHours: { type: String, default: 'Mon–Fri: 8AM–6PM | Sat: 9AM–3PM' },
  logo: {
    url: String,
    public_id: String,
  },
  favicon: {
    url: String,
    public_id: String,
  },
  social: {
    facebook: String,
    instagram: String,
    linkedin: String,
    twitter: String,
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
