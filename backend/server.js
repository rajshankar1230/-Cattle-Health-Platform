const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const breedRoutes = require('./routes/breedRoutes');

// Load backend/.env locally. Render injects production variables.
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/breeds', breedRoutes);

// Keep unknown API paths as JSON 404 responses.
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// Serve the Vite production build.
const frontendDist = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDist));

// SPA fallback for frontend routes.
app.use((req, res, next) => {
  if (req.method !== 'GET' || !req.accepts('html')) return next();
  res.sendFile(path.join(frontendDist, 'index.html'));
});

const startServer = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 5000;
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Application startup failed:', error.message);
    process.exit(1);
  }
};

startServer();
