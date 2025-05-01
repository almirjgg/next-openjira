import mongoose from 'mongoose';

/*
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 * */
const mongooseConnection = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongooseConnection.isConnected === 1) {
    console.log('Using existing database connection');
    return;
  }
  if (mongoose.connections.length > 0) {
    mongooseConnection.isConnected = mongoose.connections[0].readyState;
    if (mongooseConnection.isConnected === 1) {
      console.log('Using existing database connection');
      return;
    }
    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGODB_URI || '');
  mongooseConnection.isConnected = 1;
  console.log('Database connected:', process.env.MONGODB_URI);
};

export const disconnect = async () => {
  if (mongooseConnection.isConnected === 0) return;
  await mongoose.disconnect();
  mongooseConnection.isConnected = 0;
  console.log('Database disconnected');
};
