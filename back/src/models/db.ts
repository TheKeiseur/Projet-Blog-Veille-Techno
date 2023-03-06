import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose.set('strictQuery', true);

export const connectToMongo = async () => {
  try {
    await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/blog`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as mongoose.ConnectOptions);

    console.log('Connected to database');
    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
}