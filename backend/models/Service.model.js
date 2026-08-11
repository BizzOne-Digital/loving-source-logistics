const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String }, // emoji or icon name
  image: {
    url: String,
    public_id: String,
  },
  category: {
    type: String,
    enum: ['medical', 'legal', 'automotive', 'business', 'general'],
    default: 'general'
  },
  features: [String],
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
