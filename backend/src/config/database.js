const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    const connectionString =
      'mongodb+srv://saltzman7070:FdUMa2xkfhYadiAg@cluster0.3yd2lsw.mongodb.net/ktuClinicDb?retryWrites=true&w=majority&appName=Cluster0';

    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Your mongoDB is now connected');
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit if DB connection fails
  }
};

module.exports = connectToDatabase;
