// config/db.js
// This file connects our app to MongoDB database

const mongoose = require('mongoose')

// This function connects to MongoDB
const connectDB = async () => {
  try {
    // Try to connect using the URL from .env file
    const conn = await mongoose.connect(process.env.MONGO_URI)
//     console.log("Connected DB:", conn.connection.name);
// console.log("Host:", conn.connection.host);

    // If successful, print the host name
    console.log(`✅ MongoDB connected: ${conn.connection.host}`)

  } catch (error) {
    // If connection fails, print the error and stop server
    console.log(`❌ MongoDB connection failed: ${error.message}`)
    process.exit(1) // 1 means error, 0 means success
  }
}

module.exports = connectDB
