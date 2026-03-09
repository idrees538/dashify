const User = require('../user/user.model');
const Video = require('../video/video.model');
const Project = require('../project/project.model');
const { CreditBank, Transaction } = require('../credit/credit.model');
const BookingRequest = require('../credit/booking.model');
const Subscription = require('../credit/subscription.model');
const asyncHandler = require('../../core/asyncHandler');
const ApiError = require('../../core/ApiError');
const { sendSuccess, sendPaginated } = require('../../core/response');

/**
 * @route   GET /api/admin/stats
 * @desc    Get platform-wide statistics
 */
const getDashboardStats = asyncHandler(async (_req, res) => {
    const [
        totalUsers,
        totalProjects,
        totalVideos,
        totalCredits,
        recentUsers,
        activeSubscriptions,
        pendingBookings,
    ] = await Promise.all([
        User.countDocuments(),
        Project.countDocuments(),
        Video.countDocuments(),
        CreditBank.aggregate([
            {
                $group: {
                    _id: null,
                    totalAllocated: { $sum: '$totalCredits' },
                    totalUsed: { $sum: '$usedCredits' },
                },
            },
        ]),
        User.find().sort({ createdAt: -1 }).limit(5).select('name email role createdAt'),
        Subscription.countDocuments({ status: 'active' }),
        BookingRequest.countDocuments({ status: 'pending' }),
    ]);

    sendSuccess(res, {
        totalUsers,
        totalProjects,
        totalVideos,
        credits: {
            totalAllocated: totalCredits[0]?.totalAllocated || 0,
            totalUsed: totalCredits[0]?.totalUsed || 0,
        },
        activeSubscriptions,
        pendingBookings,
        recentUsers,
    }, 'Admin stats retrieved');
});

/**
 * @route   PUT /api/admin/users/:id/role
 * @desc    Update user role
 */
const updateUserRole = asyncHandler(async (req, res) => {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
        throw ApiError.badRequest('Role must be "user" or "admin"');
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true }
    );

    if (!user) throw ApiError.notFound('User not found');

    sendSuccess(res, { user }, 'User role updated');
});

/**
 * @route   GET /api/admin/users
 * @desc    Get all users with their credit bank and subscription info
 */
const getAllUsers = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const { search } = req.query;

    const filter = {};
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
        ];
    }

    const [users, total] = await Promise.all([
        User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
        User.countDocuments(filter),
    ]);

    // Enrich each user with credit and subscription data
    const enriched = await Promise.all(
        users.map(async (u) => {
            const [bank, subscription] = await Promise.all([
                CreditBank.findOne({ user: u._id }),
                Subscription.findOne({ user: u._id }),
            ]);
            return {
                ...u.toJSON(),
                creditBank: bank || null,
                subscription: subscription || null,
            };
        })
    );

    sendPaginated(res, enriched, { page, limit, total }, 'Users retrieved');
});

/**
 * @route   GET /api/admin/credits
 * @desc    Get all users' credit banks
 */
const getAllUserCredits = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [banks, total] = await Promise.all([
        CreditBank.find()
            .sort({ updatedAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('user', 'name email avatar'),
        CreditBank.countDocuments(),
    ]);

    sendPaginated(res, banks, { page, limit, total }, 'All credit banks retrieved');
});

/**
 * @route   POST /api/admin/credits/grant
 * @desc    Manually grant credits to a user
 */
const grantCreditsToUser = asyncHandler(async (req, res) => {
    const { userId, amount, description } = req.body;
    if (!userId || !amount) throw ApiError.badRequest('userId and amount are required');
    if (amount < 1) throw ApiError.badRequest('Amount must be at least 1');

    let bank = await CreditBank.findOne({ user: userId });
    if (!bank) {
        bank = await CreditBank.create({ user: userId, totalCredits: 0 });
    }

    const MAX_CREDITS = 20;
    const newTotal = bank.totalCredits + amount;
    if (newTotal > MAX_CREDITS) {
        throw ApiError.badRequest(`Cannot exceed ${MAX_CREDITS} total credits. User currently has ${bank.totalCredits}.`);
    }

    bank.totalCredits += amount;
    await bank.save();

    const transaction = await Transaction.create({
        user: userId,
        type: 'credit',
        amount,
        description: description || 'Admin granted credits',
        category: 'Other',
    });

    sendSuccess(res, { bank, transaction }, 'Credits granted', 201);
});

/**
 * @route   POST /api/admin/credits/deduct
 * @desc    Manually deduct credits from a user
 */
const deductCreditsFromUser = asyncHandler(async (req, res) => {
    const { userId, amount, description } = req.body;
    if (!userId || !amount) throw ApiError.badRequest('userId and amount are required');
    if (amount < 1) throw ApiError.badRequest('Amount must be at least 1');

    const bank = await CreditBank.findOne({ user: userId });
    if (!bank) throw ApiError.notFound('Credit bank not found');

    if (bank.remainingCredits < amount) {
        throw ApiError.badRequest(`User only has ${bank.remainingCredits} available credits.`);
    }

    bank.usedCredits += amount;
    await bank.save();

    const transaction = await Transaction.create({
        user: userId,
        type: 'debit',
        amount,
        description: description || 'Admin deducted credits',
        category: 'Other',
    });

    sendSuccess(res, { bank, transaction }, 'Credits deducted');
});

module.exports = {
    getDashboardStats,
    updateUserRole,
    getAllUsers,
    getAllUserCredits,
    grantCreditsToUser,
    deductCreditsFromUser,
};
