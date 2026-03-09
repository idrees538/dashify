const Subscription = require('./subscription.model');
const { CreditBank, Transaction } = require('./credit.model');
const asyncHandler = require('../../core/asyncHandler');
const ApiError = require('../../core/ApiError');
const { sendSuccess, sendPaginated } = require('../../core/response');

const CREDITS_PER_CYCLE = 10;
const MAX_CREDITS = 20;
const FIRST_MONTH_PRICE = 375;
const CONSECUTIVE_PRICE = 275;

/**
 * Calculate one month from a given date.
 */
function addOneMonth(date) {
    const d = new Date(date);
    d.setMonth(d.getMonth() + 1);
    return d;
}

/**
 * Grant credits for a new cycle, handling rollover logic.
 * - Unused credits roll over (up to 1 month)
 * - Max total credits = 20
 */
async function grantCycleCredits(userId) {
    let bank = await CreditBank.findOne({ user: userId });

    if (!bank) {
        bank = await CreditBank.create({
            user: userId,
            totalCredits: CREDITS_PER_CYCLE,
            usedCredits: 0,
            rolloverCredits: 0,
            cycleCredits: CREDITS_PER_CYCLE,
            lastCycleDate: new Date(),
        });
    } else {
        // Calculate rollover: remaining credits from this cycle
        const remaining = bank.totalCredits - bank.usedCredits;
        // Previous rollover expires (only 1 month grace), so only current remaining rolls over
        const rollover = Math.min(remaining, MAX_CREDITS - CREDITS_PER_CYCLE);

        bank.rolloverCredits = rollover;
        bank.totalCredits = CREDITS_PER_CYCLE + rollover;
        bank.usedCredits = 0;
        bank.cycleCredits = CREDITS_PER_CYCLE;
        bank.lastCycleDate = new Date();
        bank.expiresAt = addOneMonth(new Date());
        await bank.save();
    }

    // Record the credit grant transaction
    await Transaction.create({
        user: userId,
        type: 'credit',
        amount: CREDITS_PER_CYCLE,
        description: 'Monthly credit grant',
        category: 'Subscription',
    });

    return bank;
}

// ─── USER ENDPOINTS ──────────────────────────────────────────

/**
 * @route   GET /api/credits/subscription
 * @desc    Get current user's subscription
 */
const getSubscription = asyncHandler(async (req, res) => {
    const subscription = await Subscription.findOne({ user: req.user._id });

    if (!subscription) {
        return sendSuccess(res, { subscription: null }, 'No active subscription found');
    }

    sendSuccess(res, { subscription }, 'Subscription retrieved');
});

// ─── ADMIN ENDPOINTS ──────────────────────────────────────────

/**
 * @route   GET /api/credits/subscription/all
 * @desc    Get all subscriptions (admin)
 */
const getAllSubscriptions = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const { status } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const [subscriptions, total] = await Promise.all([
        Subscription.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('user', 'name email avatar phone'),
        Subscription.countDocuments(filter),
    ]);

    sendPaginated(res, subscriptions, { page, limit, total }, 'Subscriptions retrieved');
});

/**
 * @route   POST /api/credits/subscription/activate
 * @desc    Activate a subscription for a user (admin)
 */
const activateSubscription = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) throw ApiError.badRequest('userId is required');

    // Check if user already has an active subscription
    let subscription = await Subscription.findOne({ user: userId });

    const now = new Date();
    const cycleEnd = addOneMonth(now);

    if (subscription && subscription.status === 'active') {
        throw ApiError.badRequest('User already has an active subscription');
    }

    // Determine pricing: if lapsed or new, it's $375; if renewing consecutive, it's $275
    let price = FIRST_MONTH_PRICE;
    let consecutiveMonths = 1;

    if (subscription) {
        // Reactivating after lapse — reset to $375
        subscription.status = 'active';
        subscription.currentCycleStart = now;
        subscription.currentCycleEnd = cycleEnd;
        subscription.consecutiveMonths = 1;
        subscription.priceThisCycle = FIRST_MONTH_PRICE;
        subscription.history.push({
            cycleStart: now,
            cycleEnd,
            price: FIRST_MONTH_PRICE,
        });
        await subscription.save();
    } else {
        subscription = await Subscription.create({
            user: userId,
            status: 'active',
            currentCycleStart: now,
            currentCycleEnd: cycleEnd,
            consecutiveMonths: 1,
            priceThisCycle: FIRST_MONTH_PRICE,
            history: [{ cycleStart: now, cycleEnd, price: FIRST_MONTH_PRICE }],
        });
    }

    // Grant initial credits
    const bank = await grantCycleCredits(userId);

    sendSuccess(res, { subscription, bank }, 'Subscription activated', 201);
});

/**
 * @route   POST /api/credits/subscription/renew
 * @desc    Renew a subscription (admin — triggered after payment confirmation)
 */
const renewSubscription = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) throw ApiError.badRequest('userId is required');

    const subscription = await Subscription.findOne({ user: userId });
    if (!subscription) throw ApiError.notFound('No subscription found for this user');

    if (subscription.status !== 'active') {
        throw ApiError.badRequest('Cannot renew a non-active subscription. Activate first.');
    }

    const now = new Date();
    const cycleEnd = addOneMonth(now);

    subscription.currentCycleStart = now;
    subscription.currentCycleEnd = cycleEnd;
    subscription.consecutiveMonths += 1;
    subscription.priceThisCycle = CONSECUTIVE_PRICE;
    subscription.history.push({
        cycleStart: now,
        cycleEnd,
        price: CONSECUTIVE_PRICE,
    });
    await subscription.save();

    // Grant cycle credits with rollover
    const bank = await grantCycleCredits(userId);

    sendSuccess(res, { subscription, bank }, 'Subscription renewed');
});

/**
 * @route   POST /api/credits/subscription/lapse
 * @desc    Mark a subscription as lapsed (admin)
 */
const lapseSubscription = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) throw ApiError.badRequest('userId is required');

    const subscription = await Subscription.findOne({ user: userId });
    if (!subscription) throw ApiError.notFound('No subscription found for this user');

    subscription.status = 'lapsed';
    subscription.consecutiveMonths = 0;
    await subscription.save();

    sendSuccess(res, { subscription }, 'Subscription marked as lapsed');
});

module.exports = {
    getSubscription,
    getAllSubscriptions,
    activateSubscription,
    renewSubscription,
    lapseSubscription,
};
