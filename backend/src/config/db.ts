import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI as string;
  if (!uri) throw new Error('MONGO_URI missing');

  await mongoose.connect(uri, {
  });
  console.log('MongoDB connected');
};

export default connectDB;
