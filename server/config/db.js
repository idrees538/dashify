const mongoose = require('mongoose');

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    if (!process.env.MONGO_URI) {
        console.error('❌ MONGO_URI is not defined in environment variables');
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        // For serverless functions, we don't want to call process.exit(1)
        // as it will crash the function. We let the individual requests fail
        // or handle the error where needed.
    }
};

module.exports = connectDB;
