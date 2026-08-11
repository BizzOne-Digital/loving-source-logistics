const Hero = require('../models/Hero.model');
const { cloudinary } = require('../config/cloudinary');

exports.get = async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create({
        headline: 'Reliable Delivery. Professional Service. Every Time.',
        subheadline: 'Medical, Legal, Automotive & Business Courier Services Across the DFW Metroplex',
        stats: [
          { value: '500+', label: 'Deliveries Completed' },
          { value: '24/7', label: 'On-Demand Service' },
          { value: '100%', label: 'Satisfaction Rate' },
          { value: '10+', label: 'Cities Served' },
        ]
      });
    }
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    let hero = await Hero.findOne();
    const data = { ...req.body };
    if (typeof data.stats === 'string') data.stats = JSON.parse(data.stats);
    if (req.file) {
      if (hero?.backgroundImage?.public_id) await cloudinary.uploader.destroy(hero.backgroundImage.public_id);
      data.backgroundImage = { url: req.file.path, public_id: req.file.filename };
    }
    if (!hero) hero = await Hero.create(data);
    else hero = await Hero.findOneAndUpdate({}, data, { new: true });
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
