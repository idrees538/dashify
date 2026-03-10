const Onboarding = require('./onboarding.model');
const User = require('../user/user.model');
const { CreditBank } = require('../credit/credit.model');
const Subscription = require('../credit/subscription.model');
const { sendSMS, TEMPLATES } = require('../sms/sms.service');
const asyncHandler = require('../../core/asyncHandler');
const ApiError = require('../../core/ApiError');
const { sendSuccess, sendPaginated } = require('../../core/response');

// ─── USER ENDPOINTS ──────────────────────────────────────────

/**
 * @route   GET /api/onboarding/status
 * @desc    Get current user's onboarding status
 */
const getMyOnboardingStatus = asyncHandler(async (req, res) => {
    let onboarding = await Onboarding.findOne({ user: req.user._id });

    if (!onboarding) {
        onboarding = await Onboarding.create({
            user: req.user._id,
            isExistingUser: true,
            status: 'form_pending',
        });
    }

    sendSuccess(res, { onboarding }, 'Onboarding status retrieved');
});

// ─── ADMIN ENDPOINTS ──────────────────────────────────────────

/**
 * @route   GET /api/onboarding/all
 * @desc    Get all onboarding records (admin)
 */
const getAllOnboarding = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const { status } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const [records, total] = await Promise.all([
        Onboarding.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('user', 'name email avatar phone'),
        Onboarding.countDocuments(filter),
    ]);

    sendPaginated(res, records, { page, limit, total }, 'Onboarding records retrieved');
});

/**
 * @route   PUT /api/onboarding/:userId/step
 * @desc    Manually advance a user's onboarding step (admin)
 */
const updateOnboardingStep = asyncHandler(async (req, res) => {
    const { step, data } = req.body;
    if (!step) throw ApiError.badRequest('step is required');

    let onboarding = await Onboarding.findOne({ user: req.params.userId });
    if (!onboarding) {
        onboarding = await Onboarding.create({
            user: req.params.userId,
            isExistingUser: true,
        });
    }

    const now = new Date();

    switch (step) {
        case 'typeform':
            onboarding.typeformCompleted = true;
            onboarding.typeformSubmittedAt = now;
            onboarding.status = 'payment_pending';
            break;

        case 'payment':
            onboarding.paymentCompleted = true;
            onboarding.paymentCompletedAt = now;
            onboarding.status = 'call_pending';
            break;

        case 'strategy_call':
            onboarding.strategyCallBooked = true;
            onboarding.strategyCallBookedAt = now;
            if (data?.callDate) onboarding.strategyCallDate = new Date(data.callDate);
            onboarding.status = 'shoot_pending';
            break;

        case 'shoot_day':
            onboarding.shootDayScheduled = true;
            onboarding.shootDayScheduledAt = now;
            if (data?.shootDate) onboarding.shootDate = new Date(data.shootDate);
            onboarding.status = 'completed';
            break;

        case 'skip_to_completed':
            onboarding.typeformCompleted = true;
            onboarding.paymentCompleted = true;
            onboarding.strategyCallBooked = true;
            onboarding.shootDayScheduled = true;
            onboarding.status = 'completed';
            onboarding.isExistingUser = true;
            break;

        default:
            throw ApiError.badRequest(`Unknown step: ${step}`);
    }

    if (data?.notes) onboarding.notes = data.notes;
    await onboarding.save();

    // Send SMS Notification
    const user = await User.findById(req.params.userId);
    if (user && user.phone) {
        let smsBody = '';
        if (step === 'payment') smsBody = TEMPLATES.CALENDAR_LINK(user.name, 'https://calendly.com/dashify/strategy-call');
        else if (step === 'strategy_call') smsBody = `Hi ${user.name}, your strategy call is booked! We will see you then.`;
        else if (step === 'shoot_day') smsBody = TEMPLATES.BOOKING_CONFIRMED(user.name, onboarding.shootDate?.toLocaleDateString() || 'soon');
        else if (step === 'skip_to_completed') smsBody = `Hi ${user.name}, welcome to Dashify! Your profile is now set up.`;

        if (smsBody) await sendSMS(user.phone, smsBody);
    }

    sendSuccess(res, { onboarding }, `Onboarding step "${step}" updated`);
});

// ─── WEBHOOK ENDPOINTS ──────────────────────────────────────────

const handleTypeformWebhook = asyncHandler(async (req, res) => {
    const payload = req.body;
    const formResponse = payload.form_response || payload;
    const hidden = formResponse.hidden || {};
    const answers = formResponse.answers || [];

    let email = hidden.email || '';
    let name = hidden.name || '';
    let phone = '';

    for (const answer of answers) {
        if (answer.type === 'email') email = answer.email;
        if (answer.type === 'short_text' && answer.field.ref.includes('name')) name = answer.text;
        if (answer.type === 'phone_number') phone = answer.phone_number;
    }

    if (!email) return sendSuccess(res, { received: true }, 'Webhook received');

    let user = await User.findOne({ email });
    if (!user) {
        user = await User.create({
            name: name || email.split('@')[0],
            email,
            password: `Temp${Date.now()}!`,
            phone,
        });
        await CreditBank.create({ user: user._id });
    }

    let onboarding = await Onboarding.findOne({ user: user._id });
    if (!onboarding) onboarding = await Onboarding.create({ user: user._id });

    onboarding.typeformCompleted = true;
    onboarding.typeformSubmittedAt = new Date();
    onboarding.status = 'payment_pending';
    await onboarding.save();

    sendSuccess(res, { userId: user._id }, 'Typeform processed');
});

const handleStripeWebhook = asyncHandler(async (req, res) => {
    const event = req.body;
    if (event.type !== 'checkout.session.completed') return sendSuccess(res, { received: true });

    const session = event.data.object;
    const email = session.customer_email || session.customer_details?.email;
    if (!email) return sendSuccess(res, { received: true });

    const user = await User.findOne({ email });
    if (!user) return sendSuccess(res, { received: true });

    let onboarding = await Onboarding.findOne({ user: user._id });
    if (!onboarding) onboarding = await Onboarding.create({ user: user._id });

    onboarding.paymentCompleted = true;
    onboarding.paymentCompletedAt = new Date();
    onboarding.status = 'call_pending';
    await onboarding.save();

    // Auto-activate subscription logic would go here (already implemented in subscription.controller)

    sendSuccess(res, { userId: user._id }, 'Stripe processed');
});

module.exports = {
    getMyOnboardingStatus,
    getAllOnboarding,
    updateOnboardingStep,
    handleTypeformWebhook,
    handleStripeWebhook,
};
