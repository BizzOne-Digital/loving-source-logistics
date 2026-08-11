const Testimonial = require('../models/Testimonial.model');
const { cloudinary } = require('../config/cloudinary');

exports.getAll = async (req, res) => {
  try {
    const items = await Testimonial.find({ isActive: true }).sort({ order: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllAdmin = async (req, res) => {
  try {
    const items = await Testimonial.find().sort({ order: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.avatar = { url: req.file.path, public_id: req.file.filename };
    const item = await Testimonial.create(data);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    const data = { ...req.body };
    if (req.file) {
      if (item.avatar?.public_id) await cloudinary.uploader.destroy(item.avatar.public_id);
      data.avatar = { url: req.file.path, public_id: req.file.filename };
    }
    const updated = await Testimonial.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    if (item.avatar?.public_id) await cloudinary.uploader.destroy(item.avatar.public_id);
    await item.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
