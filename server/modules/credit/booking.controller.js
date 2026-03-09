const BookingRequest = require('./booking.model');
const { CreditBank, Transaction } = require('./credit.model');
const asyncHandler = require('../../core/asyncHandler');
const ApiError = require('../../core/ApiError');
const { sendSuccess, sendPaginated } = require('../../core/response');
const validate = require('../../core/validate');

const MIN_CREDITS_FOR_SHOOT = 10;

// ─── USER ENDPOINTS ──────────────────────────────────────────

/**
 * @route   POST /api/credits/booking
 * @desc    Create a new booking request
 */
const createBookingRequest = asyncHandler(async (req, res) => {
    validate(req.body, {
        deliverables: { required: true },
    });

    const { deliverables } = req.body;

    if (!Array.isArray(deliverables) || deliverables.length === 0) {
        throw ApiError.badRequest('At least one deliverable is required');
    }

    // Validate each deliverable
    const validTypes = ['Performance Video', 'Day in the Life', 'Visualizer', 'Photography', 'Report', 'Other'];
    for (const d of deliverables) {
        if (!validTypes.includes(d.type)) {
            throw ApiError.badRequest(`Invalid deliverable type: ${d.type}`);
        }
        if (!d.creditCost || d.creditCost < 1) {
            throw ApiError.badRequest('Each deliverable must have a valid creditCost >= 1');
        }
    }

    const totalCredits = deliverables.reduce((sum, d) => sum + d.creditCost, 0);

    // Check credit balance
    const bank = await CreditBank.findOne({ user: req.user._id });
    if (!bank) throw ApiError.notFound('Credit bank not found. Please contact admin.');

    if (bank.remainingCredits < MIN_CREDITS_FOR_SHOOT) {
        throw ApiError.badRequest(
            `You need at least ${MIN_CREDITS_FOR_SHOOT} credits to request a shoot. You have ${bank.remainingCredits}.`
        );
    }

    if (bank.remainingCredits < totalCredits) {
        throw ApiError.badRequest(
            `Insufficient credits. This request needs ${totalCredits} credits, you have ${bank.remainingCredits}.`
        );
    }

    // Check no approved booking in current month
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const existingBooking = await BookingRequest.findOne({
        user: req.user._id,
        status: 'approved',
        shootMonth: currentMonth,
        shootYear: currentYear,
    });

    if (existingBooking) {
        throw ApiError.badRequest('You already have an approved shoot this month. Only one shoot per month is allowed.');
    }

    const booking = await BookingRequest.create({
        user: req.user._id,
        deliverables,
        totalCredits,
    });

    sendSuccess(res, { booking }, 'Booking request submitted', 201);
});

/**
 * @route   GET /api/credits/booking
 * @desc    Get current user's booking requests
 */
const getMyBookingRequests = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const { status } = req.query;

    const filter = { user: req.user._id };
    if (status) filter.status = status;

    const [bookings, total] = await Promise.all([
        BookingRequest.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('approvedBy', 'name email'),
        BookingRequest.countDocuments(filter),
    ]);

    sendPaginated(res, bookings, { page, limit, total }, 'Booking requests retrieved');
});

/**
 * @route   DELETE /api/credits/booking/:id
 * @desc    Cancel a pending booking request
 */
const cancelBookingRequest = asyncHandler(async (req, res) => {
    const booking = await BookingRequest.findOne({
        _id: req.params.id,
        user: req.user._id,
    });

    if (!booking) throw ApiError.notFound('Booking request not found');

    if (booking.status !== 'pending') {
        throw ApiError.badRequest(`Cannot cancel a ${booking.status} request`);
    }

    booking.status = 'cancelled';
    await booking.save();

    sendSuccess(res, { booking }, 'Booking request cancelled');
});

// ─── ADMIN ENDPOINTS ──────────────────────────────────────────

/**
 * @route   GET /api/credits/booking/all
 * @desc    Get all booking requests (admin)
 */
const getAllBookingRequests = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const { status, userId } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (userId) filter.user = userId;

    const [bookings, total] = await Promise.all([
        BookingRequest.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('user', 'name email avatar')
            .populate('approvedBy', 'name email'),
        BookingRequest.countDocuments(filter),
    ]);

    sendPaginated(res, bookings, { page, limit, total }, 'All booking requests retrieved');
});

/**
 * @route   PUT /api/credits/booking/:id/approve
 * @desc    Approve a booking request (admin)
 */
const approveBookingRequest = asyncHandler(async (req, res) => {
    const { shootDate, adminNotes, deliverables: updatedDeliverables } = req.body;

    const booking = await BookingRequest.findById(req.params.id);
    if (!booking) throw ApiError.notFound('Booking request not found');

    if (booking.status !== 'pending') {
        throw ApiError.badRequest(`Cannot approve a ${booking.status} request`);
    }

    // If admin updated deliverables (labels, costs), apply them
    if (updatedDeliverables && Array.isArray(updatedDeliverables)) {
        booking.deliverables = updatedDeliverables;
        booking.totalCredits = updatedDeliverables.reduce((sum, d) => sum + d.creditCost, 0);
    }

    // Verify user still has enough credits
    const bank = await CreditBank.findOne({ user: booking.user });
    if (!bank) throw ApiError.notFound('User credit bank not found');

    if (bank.remainingCredits < booking.totalCredits) {
        throw ApiError.badRequest(
            `User only has ${bank.remainingCredits} credits, but this request needs ${booking.totalCredits}.`
        );
    }

    // Deduct credits
    bank.usedCredits += booking.totalCredits;
    await bank.save();

    // Create debit transaction for each deliverable
    const transactions = [];
    for (const d of booking.deliverables) {
        const tx = await Transaction.create({
            user: booking.user,
            type: 'debit',
            amount: d.creditCost,
            description: `Booking: ${d.type}${d.label ? ` - ${d.label}` : ''}`,
            category: d.type,
        });
        transactions.push(tx);
    }

    // Set shoot date
    const shoot = shootDate ? new Date(shootDate) : new Date();
    booking.shootDate = shoot;
    booking.shootMonth = shoot.getMonth() + 1;
    booking.shootYear = shoot.getFullYear();
    booking.status = 'approved';
    booking.approvedBy = req.user._id;
    booking.approvedAt = new Date();
    booking.adminNotes = adminNotes || booking.adminNotes;
    await booking.save();

    sendSuccess(res, { booking, bank, transactions }, 'Booking request approved');
});

/**
 * @route   PUT /api/credits/booking/:id/reject
 * @desc    Reject a booking request (admin)
 */
const rejectBookingRequest = asyncHandler(async (req, res) => {
    const { adminNotes } = req.body;

    const booking = await BookingRequest.findById(req.params.id);
    if (!booking) throw ApiError.notFound('Booking request not found');

    if (booking.status !== 'pending') {
        throw ApiError.badRequest(`Cannot reject a ${booking.status} request`);
    }

    booking.status = 'rejected';
    booking.adminNotes = adminNotes || '';
    await booking.save();

    sendSuccess(res, { booking }, 'Booking request rejected');
});

module.exports = {
    createBookingRequest,
    getMyBookingRequests,
    cancelBookingRequest,
    getAllBookingRequests,
    approveBookingRequest,
    rejectBookingRequest,
};
