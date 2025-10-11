const express = require('express');
const WeekendPlan = require('../models/WeekendPlan');
const router = express.Router();

// Get all plans
router.get('/', async (req, res) => {
  try {
    const plans = await WeekendPlan.find().populate('saturday.activityId sunday.activityId');
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const plan = await WeekendPlan.findById(req.params.id)
      .populate({
        path: 'saturday.activityId',
        model: 'Activity'
      })
      .populate({
        path: 'sunday.activityId', 
        model: 'Activity'
      });
    
    if (!plan) return res.status(404).json({ error: 'Plan not found' });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new plan
router.post('/', async (req, res) => {
  try {
    const plan = new WeekendPlan(req.body);
    await plan.save();
    await plan.populate('saturday.activityId sunday.activityId');
    res.status(201).json(plan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update plan
router.put('/:id', async (req, res) => {
  try {
    const plan = await WeekendPlan.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('saturday.activityId sunday.activityId');
    if (!plan) return res.status(404).json({ error: 'Plan not found' });
    res.json(plan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete plan
router.delete('/:id', async (req, res) => {
  try {
    const plan = await WeekendPlan.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ error: 'Plan not found' });
    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;