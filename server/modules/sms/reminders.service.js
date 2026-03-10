const Onboarding = require('../onboarding/onboarding.model');
const User = require('../user/user.model');
const { sendSMS, TEMPLATES } = require('../sms/sms.service');
const asyncHandler = require('../../core/asyncHandler');
const { sendSuccess } = require('../../core/response');

/**
 * Check for shoots happening tomorrow and send reminders
 * This would typically be called by a cron job once a day.
 */
const sendShootReminders = async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

    console.log(`[REMINDERS] Checking for shoots between ${tomorrow.toISOString()} and ${dayAfterTomorrow.toISOString()}`);

    const upcomingOnboardings = await Onboarding.find({
        shootDate: {
            $gte: tomorrow,
            $lt: dayAfterTomorrow
        },
        shootReminderSentAt: { $exists: false }
    }).populate('user');

    let count = 0;
    for (const onboarding of upcomingOnboardings) {
        if (onboarding.user && onboarding.user.phone) {
            const result = await sendSMS(
                onboarding.user.phone,
                TEMPLATES.SHOOT_REMINDER(onboarding.user.name, onboarding.shootDate.toLocaleDateString())
            );
            if (result) {
                onboarding.shootReminderSentAt = new Date();
                await onboarding.save();
                count++;
            }
        }
    }

    console.log(`[REMINDERS] Sent ${count} shoot reminders`);
    return count;
};

/**
 * @route   POST /api/admin/sms/trigger-reminders
 * @desc    Manually trigger shoot reminders (admin)
 */
const triggerReminders = asyncHandler(async (req, res) => {
    const count = await sendShootReminders();
    sendSuccess(res, { count }, `Successfully processed reminders. ${count} SMS sent.`);
});

module.exports = {
    sendShootReminders,
    triggerReminders
};
