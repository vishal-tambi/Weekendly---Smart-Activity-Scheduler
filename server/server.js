const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Activity = require('./models/Activity');
const activitiesData = require('./data/activities');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}));
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected Vishal now dance ! 🥲'))
  .catch(err => console.error('MongoDB connection error:', err));

// Seed activities on first run
const seedActivities = async () => {
  try {
    const count = await Activity.countDocuments();
    if (count === 0) {
      await Activity.insertMany(activitiesData);
      console.log('Activities seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding activities:', error);
  }
};

// Routes
app.use('/api/activities', require('./routes/activities'));
app.use('/api/plans', require('./routes/plans'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Weekendly API is running!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  seedActivities();
});