const { sendSMS } = require('./sms.service');
const asyncHandler = require('../../core/asyncHandler');
const { sendSuccess } = require('../../core/response');
const ApiError = require('../../core/ApiError');

/**
 * @route   POST /api/admin/sms/send
 * @desc    Send a custom SMS to a user (admin only)
 */
const sendCustomSMS = asyncHandler(async (req, res) => {
    const { phone, message } = req.body;

    if (!phone) throw ApiError.badRequest('Phone number is required');
    if (!message) throw ApiError.badRequest('Message body is required');

    const result = await sendSMS(phone, message);

    if (!result) {
        throw ApiError.internal('Failed to send SMS. Check logs for details.');
    }

    sendSuccess(res, null, `SMS sent to ${phone}`);
});

module.exports = {
    sendCustomSMS,
};
