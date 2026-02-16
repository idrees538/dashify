const express = require('express');
const router = express.Router();

// Import route modules here as you build them
// const authRoutes = require('./auth');
// const userRoutes = require('./users');

// Register routes
// router.use('/auth', authRoutes);
// router.use('/users', userRoutes);

// Placeholder route
router.get('/', (req, res) => {
    res.json({
        message: 'Dashify API v1',
        endpoints: [
            'GET  /api/health',
            'POST /api/auth/login',
            'POST /api/auth/register',
            'GET  /api/users',
        ],
    });
});

module.exports = router;
