const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth');
const { adminOnly } = require('../../middleware/adminOnly');
const {
    getDashboardStats,
    updateUserRole,
    getAllUsers,
    getAllUserCredits,
    grantCreditsToUser,
    deductCreditsFromUser,
} = require('./admin.controller');

// All admin routes require authentication + admin role
router.use(protect, adminOnly);

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.get('/credits', getAllUserCredits);
router.post('/credits/grant', grantCreditsToUser);
router.post('/credits/deduct', deductCreditsFromUser);

module.exports = router;
