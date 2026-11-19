const express = require('express');
const router = express.Router();
const Breed = require('../models/Breed');

// GET all breeds
router.get('/', async (req, res) => {
  try {
    const breeds = await Breed.find();
    res.status(200).json(breeds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single breed by name
router.get('/:name', async (req, res) => {
  try {
    const breed = await Breed.findOne({ name: new RegExp(`^${req.params.name}$`, 'i') });
    if (!breed) return res.status(404).json({ message: 'Breed record not found' });
    res.status(200).json(breed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CRITICAL: Must export router
module.exports = router;