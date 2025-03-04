import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/your_database');
    console.log('MongoDB connected successfully');
  } catch (error: unknown) {
    // Type guard to check if error is an Error object
    if (error instanceof Error) {
      console.error('MongoDB connection error:', error.message);
    } else {
      console.error('Unknown MongoDB connection error:', error);
    }
    process.exit(1);
  }
};

export default connectDB;