const mongoose = require('mongoose');

const BreedSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, default: 'Desi Cow Breeds' },
  origin: {
    state: { type: String, required: true },
    region: { type: String, required: true },
    climateSuitability: { type: String, required: true }
  },
  imageUrl: { type: String, default: '' },
  healthParameters: {
    normalTemperature: { type: String, default: '38.5°C - 39.2°C (101.5°F - 102.5°F)' },
    heartRateBPM: { type: String, default: '60 - 80 beats/min' },
    respiratoryRate: { type: String, default: '15 - 30 breaths/min' },
    heatTolerance: { type: String, required: true },
    diseaseResistance: [String]
  },
  milkAndProductivity: {
    avgDailyYieldLiters: { type: String, required: true },
    peakYieldLiters: { type: String, required: true },
    lactationPeriodDays: { type: String, default: '280 - 305 days' },
    fatPercentage: { type: String, required: true },
    milkType: { type: String, default: 'A2 Beta-Casein' }
  },
  quickFacts: [String],
  avatarGuideNotes: {
    greeting: { type: String, required: true },
    vitalTip: { type: String, required: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('Breed', BreedSchema);