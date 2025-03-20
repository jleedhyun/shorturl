import { connect } from 'mongoose';

const connectMongoDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.log('MongoDB URI is not defined in the environment.');
    return;
  }

  try {
    await connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB.');
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
