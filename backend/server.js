const app = require('./app');
const { connectDB, seedAdmin } = require('./config/db');

connectDB()
  .then(async () => {
    console.log('MongoDB Connected');
    await seedAdmin();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
