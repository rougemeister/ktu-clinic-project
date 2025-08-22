// server.js
const app = require('./app');
const connectToDatabase = require('./src/config/database');

const PORT = 3000;

// Start server
app.listen(PORT, (error) => {
  if (error) {
    console.error(`❌ Error starting server: ${error}`);
  } else {
    console.log(`🚀 Server is running on port ${PORT}`);
  }
});

// Connect to MongoDB
connectToDatabase();
