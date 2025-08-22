const mongoose = require('mongoose');
require('dotenv').config(); // Load .env variables

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('✅ MongoDB is now connected');
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit if DB connection fails
  }
};

module.exports = connectToDatabase;
