const mongoose = require('mongoose');

const weekendPlanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  theme: { type: String, enum: ['lazy', 'adventurous', 'family'], default: 'lazy' },
  saturday: [{
    activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' },
    startTime: String,
    customNotes: String
  }],
  sunday: [{
    activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' },
    startTime: String,
    customNotes: String
  }],
  isLongWeekend: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WeekendPlan', weekendPlanSchema);