import mongoose from "mongoose";
import dotenv from "dotenv";

//connect to mongoDB database

dotenv.config();

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;