import mongoose from 'mongoose';

export default async () => {
  try {
    const url: string = process.env.MONGO_URL || 'mongodb://localhost:27017/mycamp';
    await mongoose.connect(url, {});
  } catch (e) {
    throw e;
  }
}