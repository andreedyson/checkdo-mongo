import mongoose from "mongoose";

export const connectToDB = async () => {
  const connection = {};
  try {
    if (connection.isConnected) return; // If the database is already connected, immediately returns

    const db = await mongoose.connect(process.env.MONGODB_URI);

    connection.isConnected = db.connections[0].readyState;
  } catch (err) {
    throw new Error(err);
  }
};
