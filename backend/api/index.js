const app = require('../app');
const { connectDB, seedAdmin } = require('../config/db');

let seeded = false;

module.exports = async (req, res) => {
  await connectDB();
  if (!seeded) {
    seeded = true;
    seedAdmin().catch(err => console.error('Seed admin error:', err));
  }
  return app(req, res);
};
