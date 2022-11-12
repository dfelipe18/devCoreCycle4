import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

export async function DBconnection() {
  try {
    const db = await mongoose.connect(MONGODB_URI);
    console.log("Connection establecida en ", db.connection.name)
  } catch (error) {
    console.error(error.message);
  }
}
