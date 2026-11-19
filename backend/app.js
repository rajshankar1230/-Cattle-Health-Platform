const express = require('express');
const breedRoutes = require('./routes/breedRoutes');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/breeds', breedRoutes);

app.use('/api', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

module.exports = app;
