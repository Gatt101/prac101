import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI!)
        const connect = mongoose.connection;

      connect.on('connected',() => {
        console.log("Database connected successfully");
      });

      connect.on('error', (err) => {
        console.error("Database connection error:", err);
        process.exit();
      })
    } catch (error) {
        console.error("Database connection error:", error);
        console.log(error);
        
    }
}
