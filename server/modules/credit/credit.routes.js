const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth');
const { adminOnly } = require('../../middleware/adminOnly');
const {
    getSummary,
    getTransactions,
    redeemCredits,
    addCredits,
    getCategoryBreakdown,
    getStats,
} = require('./credit.controller');
const {
    createBookingRequest,
    getMyBookingRequests,
    cancelBookingRequest,
    getAllBookingRequests,
    approveBookingRequest,
    rejectBookingRequest,
} = require('./booking.controller');
const {
    getSubscription,
    getAllSubscriptions,
    activateSubscription,
    renewSubscription,
    lapseSubscription,
} = require('./subscription.controller');

router.use(protect);

// ─── Credits ──────────────────────────────────────────
router.get('/summary', getSummary);
router.get('/transactions', getTransactions);
router.get('/breakdown', getCategoryBreakdown);
router.get('/stats', getStats);
router.post('/redeem', redeemCredits);
router.post('/add', addCredits);

// ─── Booking Requests (user) ──────────────────────────
router.post('/booking', createBookingRequest);
router.get('/booking', getMyBookingRequests);
router.delete('/booking/:id', cancelBookingRequest);

// ─── Booking Requests (admin) ─────────────────────────
router.get('/booking/all', adminOnly, getAllBookingRequests);
router.put('/booking/:id/approve', adminOnly, approveBookingRequest);
router.put('/booking/:id/reject', adminOnly, rejectBookingRequest);

// ─── Subscription (user) ─────────────────────────────
router.get('/subscription', getSubscription);

// ─── Subscription (admin) ─────────────────────────────
router.get('/subscription/all', adminOnly, getAllSubscriptions);
router.post('/subscription/activate', adminOnly, activateSubscription);
router.post('/subscription/renew', adminOnly, renewSubscription);
router.post('/subscription/lapse', adminOnly, lapseSubscription);

module.exports = router;
