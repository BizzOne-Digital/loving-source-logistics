const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:3000')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/services', require('./routes/service.routes'));
app.use('/api/gallery', require('./routes/gallery.routes'));
app.use('/api/quotes', require('./routes/quote.routes'));
app.use('/api/testimonials', require('./routes/testimonial.routes'));
app.use('/api/hero', require('./routes/hero.routes'));
app.use('/api/settings', require('./routes/settings.routes'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Loving Source Logistics API Running', status: 'OK' });
});
app.get('/api', (req, res) => {
  res.json({ message: 'Loving Source Logistics API Running', status: 'OK' });
});

module.exports = app;
