const mongoose = require('mongoose');

// Optimization for serverless: disable buffering
mongoose.set('bufferCommands', false);

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    if (!process.env.MONGO_URI) {
        console.error('❌ MONGO_URI is not defined in environment variables');
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            bufferCommands: false,         // Disable buffering for this connection
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        // Re-throw the error so the entry point knows the connection failed
        throw error;
    }
};

module.exports = connectDB;
