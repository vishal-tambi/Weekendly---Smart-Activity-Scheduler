const express = require('express');
const Activity = require('../models/Activity');
const router = express.Router();

// Get all activities
router.get('/', async (req, res) => {
  try {
    const { category, mood } = req.query;
    let filter = {};
    
    if (category) filter.category = category;
    if (mood) filter.mood = mood;
    
    const activities = await Activity.find(filter);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get activity by ID
router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;