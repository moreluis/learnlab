import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default async function connectToMongoDB() {
  if (!process.env.MONGODB_URL) return console.error("'MONGODB_URL' is empty");

  await mongoose.connect(process.env.MONGODB_URL);

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
}; 