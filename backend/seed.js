const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Explicitly load .env from backend directory
dotenv.config({ path: path.join(__dirname, '.env') });

const Breed = require('./models/Breed');

// Use Cloud URI from .env or fallback
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ Error: MONGO_URI is missing in your backend/.env file!");
  process.exit(1);
}

const breedsData = [
  {
    name: 'Gir',
    category: 'Desi Cow Breeds',
    origin: {
      state: 'Gujarat',
      region: 'Gir Hills (Kathiawar region, Junagadh, Bhavnagar)',
      climateSuitability: 'Tropical, hot and humid conditions'
    },
    imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=600&q=80',
    healthParameters: {
      normalTemperature: '38.5°C - 39.2°C (101.3°F - 102.5°F)',
      heartRateBPM: '60 - 75 bpm',
      respiratoryRate: '18 - 28 breaths/min',
      heatTolerance: 'High resistance to solar radiation and heat stress',
      diseaseResistance: ['Tropical tick resistance', 'Ectoparasite resistance', 'Low mastitis incidence']
    },
    milkAndProductivity: {
      avgDailyYieldLiters: '12 - 18 Liters/day',
      peakYieldLiters: '22+ Liters/day',
      lactationPeriodDays: '300 days',
      fatPercentage: '4.5% - 5.2%',
      milkType: 'A2 Beta-Casein'
    },
    quickFacts: [
      'The convex forehead acts as a cooling radiator against harsh sunlight.',
      'Possesses a distinct hump that contains the Surya Ketu Nadi vein.',
      'One of the foundational breeds used to create the American Brahman breed.'
    ],
    avatarGuideNotes: {
      greeting: "Hello! Welcome to the Gir cow section. Did you know the Gir's dome-shaped head acts like a natural sunshield?",
      vitalTip: "Normal temperature for a Gir cow is around 38.5°C. Any temperature above 39.5°C indicates fever or heat stress."
    }
  },
  {
    name: 'Sahiwal',
    category: 'Desi Cow Breeds',
    origin: {
      state: 'Punjab / Haryana Border',
      region: 'Originally Montgomery district (dry arid plains)',
      climateSuitability: 'Dry, semi-arid, and extreme temperature regions'
    },
    imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80',
    healthParameters: {
      normalTemperature: '38.5°C - 39.0°C (101.3°F - 102.2°F)',
      heartRateBPM: '65 - 80 bpm',
      respiratoryRate: '15 - 25 breaths/min',
      heatTolerance: 'Exceptional tolerance to drought and dry heat',
      diseaseResistance: ['High resistance to tick-borne fever', 'Sturdy digestive immunity against roughage']
    },
    milkAndProductivity: {
      avgDailyYieldLiters: '14 - 20 Liters/day',
      peakYieldLiters: '25+ Liters/day',
      lactationPeriodDays: '305 days',
      fatPercentage: '4.8% - 5.5%',
      milkType: 'A2 Beta-Casein'
    },
    quickFacts: [
      'Widely regarded as the heaviest milk producer among all indigenous zebu breeds.',
      'Characterized by very loose skin, giving it the local name "Lola" in some regions.',
      'High butterfat content makes its milk prime for traditional ghee preparation.'
    ],
    avatarGuideNotes: {
      greeting: "Namaste! Sahiwal is the gold standard for high milk yield among indigenous cows.",
      vitalTip: "Sahiwals thrive on high roughage, but always watch out for sudden bloat if introducing lush green legumes too fast."
    }
  },
  {
    name: 'Red Sindhi',
    category: 'Desi Cow Breeds',
    origin: {
      state: 'Sindh / Adjacent Indian Border Belts',
      region: 'Kohistan arid region and western plains',
      climateSuitability: 'Extremely dry, high-temperature zones'
    },
    imageUrl: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=600&q=80',
    healthParameters: {
      normalTemperature: '38.5°C - 39.3°C (101.5°F - 102.7°F)',
      heartRateBPM: '60 - 75 bpm',
      respiratoryRate: '16 - 26 breaths/min',
      heatTolerance: 'Very high thermal regulation capacity',
      diseaseResistance: ['Tick and protozoan parasite resistance', 'Low foot infection rate']
    },
    milkAndProductivity: {
      avgDailyYieldLiters: '10 - 16 Liters/day',
      peakYieldLiters: '18+ Liters/day',
      lactationPeriodDays: '290 days',
      fatPercentage: '4.5% - 5.0%',
      milkType: 'A2 Beta-Casein'
    },
    quickFacts: [
      'Deep reddish-brown coat that reflects strong UV rays.',
      'Compact, sturdy build making it easy to manage on small-scale farms.',
      'Docile temperament with strong maternal instincts.'
    ],
    avatarGuideNotes: {
      greeting: "Meet the Red Sindhi! A resilient, compact cow famous for thriving in harsh climates.",
      vitalTip: "A healthy Red Sindhi produces rich A2 milk even under low-input grazing conditions."
    }
  }
];

const seedDB = async () => {
  try {
    console.log('Attempting connection to MongoDB Atlas...');
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB Atlas Successfully!');

    await Breed.deleteMany({});
    console.log('Cleared old breed records.');

    await Breed.insertMany(breedsData);
    console.log('🎉 Database successfully seeded with comprehensive breed records!');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Connection / Seeding Error:', err.message);
    process.exit(1);
  }
};

seedDB();