const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth');
const { adminOnly } = require('../../middleware/adminOnly');
const {
    getMyOnboardingStatus,
    getAllOnboarding,
    updateOnboardingStep,
    handleTypeformWebhook,
    handleStripeWebhook,
} = require('./onboarding.controller');

// User Endpoints
router.get('/onboarding/status', protect, getMyOnboardingStatus);

// Admin Endpoints
router.get('/onboarding/all', protect, adminOnly, getAllOnboarding);
router.put('/onboarding/:userId/step', protect, adminOnly, updateOnboardingStep);

// Webhooks (Unauthenticated)
router.post('/webhooks/typeform', handleTypeformWebhook);
router.post('/webhooks/stripe', handleStripeWebhook);

module.exports = router;
