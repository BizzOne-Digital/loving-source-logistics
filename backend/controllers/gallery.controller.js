const Gallery = require('../models/Gallery.model');
const { cloudinary } = require('../config/cloudinary');

exports.getAll = async (req, res) => {
  try {
    const items = await Gallery.find({ isActive: true }).sort({ order: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllAdmin = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ order: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Image required' });
    const item = await Gallery.create({
      title: req.body.title,
      category: req.body.category || 'general',
      order: req.body.order || 0,
      image: { url: req.file.path, public_id: req.file.filename },
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    if (item.image?.public_id) await cloudinary.uploader.destroy(item.image.public_id);
    await item.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleActive = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    item.isActive = !item.isActive;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
