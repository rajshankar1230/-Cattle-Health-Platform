const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = require('./app');

// Load backend/.env for local development. Production hosts inject env vars.
dotenv.config({ path: path.join(__dirname, '.env') });

const startServer = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 5000;
    app.listen(port, '0.0.0.0', () => {
      console.log(`API server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Application startup failed:', error.message);
    process.exit(1);
  }
};

startServer();
