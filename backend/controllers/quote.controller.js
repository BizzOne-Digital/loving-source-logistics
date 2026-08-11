const Quote = require('../models/Quote.model');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

exports.submitQuote = async (req, res) => {
  try {
    const quote = await Quote.create(req.body);

    // Notify admin
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      subject: `New Quote Request from ${quote.companyName}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Company:</strong> ${quote.companyName}</p>
        <p><strong>Contact:</strong> ${quote.contactName}</p>
        <p><strong>Phone:</strong> ${quote.phone}</p>
        <p><strong>Email:</strong> ${quote.email}</p>
        <p><strong>Pickup:</strong> ${quote.pickupLocation}</p>
        <p><strong>Delivery:</strong> ${quote.deliveryLocation}</p>
        <p><strong>Type:</strong> ${quote.deliveryType}</p>
        <p><strong>Recurring:</strong> ${quote.isRecurring ? 'Yes' : 'No'}</p>
        <p><strong>Special Handling:</strong> ${quote.specialHandling || 'N/A'}</p>
      `
    }).catch(e => console.log('Email error:', e.message));

    res.status(201).json({ message: 'Quote submitted successfully', id: quote._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const quotes = await Quote.find(filter).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit);
    const total = await Quote.countDocuments(filter);
    res.json({ quotes, total, page: Number(page) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: 'Not found' });
    res.json(quote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
      adminNotes: req.body.adminNotes
    }, { new: true });
    res.json(quote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Quote.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
