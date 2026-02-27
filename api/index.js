const app = require('../server/app');
const connectDB = require('../server/config/db');

// Connect to database (serverless function)
connectDB();

module.exports = app;
