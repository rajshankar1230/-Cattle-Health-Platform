const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing from environment variables');
  }

  // Reuse an existing connection when a Netlify function instance is warm.
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  return mongoose.connection;
};

module.exports = connectDB;
