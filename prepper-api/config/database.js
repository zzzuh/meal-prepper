import mongoose from "mongoose";
import 'dotenv/config';

// Connects to MongoDB database
export async function connectDb() {
    await mongoose.connect(process.env.PREPPER_URL);
    console.log("connected to db");
}
