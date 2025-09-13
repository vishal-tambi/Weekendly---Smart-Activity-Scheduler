const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: Number, required: true }, // in hours
  mood: { type: String, enum: ['happy', 'relaxed', 'energetic'], required: true },
  icon: { type: String, required: true },
  description: { type: String, required: true },
  isIndoor: { type: Boolean, default: true }
});

module.exports = mongoose.model('Activity', activitySchema);