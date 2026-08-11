const Settings = require('../models/Settings.model');
const { cloudinary } = require('../config/cloudinary');

exports.get = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    const data = { ...req.body };
    if (typeof data.serviceAreas === 'string') data.serviceAreas = data.serviceAreas.split(',').map(s => s.trim());
    if (typeof data.social === 'string') data.social = JSON.parse(data.social);
    if (typeof data.seo === 'string') data.seo = JSON.parse(data.seo);

    if (req.files?.logo) {
      if (settings?.logo?.public_id) await cloudinary.uploader.destroy(settings.logo.public_id);
      data.logo = { url: req.files.logo[0].path, public_id: req.files.logo[0].filename };
    }
    if (req.files?.favicon) {
      if (settings?.favicon?.public_id) await cloudinary.uploader.destroy(settings.favicon.public_id);
      data.favicon = { url: req.files.favicon[0].path, public_id: req.files.favicon[0].filename };
    }

    if (!settings) settings = await Settings.create(data);
    else settings = await Settings.findOneAndUpdate({}, data, { new: true });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
