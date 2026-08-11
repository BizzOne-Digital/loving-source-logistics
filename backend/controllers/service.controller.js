const Service = require('../models/Service.model');
const { cloudinary } = require('../config/cloudinary');

exports.getAll = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllAdmin = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = { url: req.file.path, public_id: req.file.filename };
    }
    if (typeof data.features === 'string') data.features = data.features.split(',').map(f => f.trim());
    const service = await Service.create(data);
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    const data = { ...req.body };
    if (req.file) {
      if (service.image?.public_id) await cloudinary.uploader.destroy(service.image.public_id);
      data.image = { url: req.file.path, public_id: req.file.filename };
    }
    if (typeof data.features === 'string') data.features = data.features.split(',').map(f => f.trim());
    const updated = await Service.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    if (service.image?.public_id) await cloudinary.uploader.destroy(service.image.public_id);
    await service.deleteOne();
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
