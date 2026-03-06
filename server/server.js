const dotenv = require('dotenv');
const https = require('https');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');
const app = require('./app');

dotenv.config();

// --------------- Start Server ---------------
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        // Load SSL certificates for HTTPS (required by Adobe OAuth)
        const certPath = path.join(__dirname, 'certs', 'cert.pem');
        const keyPath = path.join(__dirname, 'certs', 'key.pem');

        if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
            const sslOptions = {
                key: fs.readFileSync(keyPath),
                cert: fs.readFileSync(certPath),
            };

            https.createServer(sslOptions, app).listen(PORT, () => {
                console.log(`🔒 HTTPS Server running on https://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
            });
        } else {
            // Fallback to HTTP if no certificates found
            app.listen(PORT, () => {
                console.log(`🚀 HTTP Server running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
            });
        }
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
