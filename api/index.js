const mongoose = require('mongoose');

// CRITICAL: Disable buffering before any models are loaded
mongoose.set('bufferCommands', false);

const connectDB = require('../server/config/db');
// App is required AFTER connectDB and buffering config to ensure models inherit settings
const app = require('../server/app');

module.exports = async (req, res) => {
    try {
        await connectDB();

        // Final safeguard check
        if (mongoose.connection.readyState !== 1) {
            throw new Error('Database connection established but not ready');
        }

        return app(req, res);
    } catch (error) {
        console.error('Vercel Function Error (Fatal):', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error (Database Connection Failed)',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
