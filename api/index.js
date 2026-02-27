const app = require('../server/app');
const connectDB = require('../server/config/db');

module.exports = async (req, res) => {
    try {
        await connectDB();
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
