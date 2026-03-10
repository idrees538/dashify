const mongoose = require('mongoose');

const onboardingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        // Step 1: Typeform Intake
        typeformCompleted: { type: Boolean, default: false },
        typeformSubmittedAt: { type: Date },
        typeformResponseId: { type: String, default: '' },
        typeformData: { type: mongoose.Schema.Types.Mixed, default: {} },

        // Step 2: Payment (Subscription Activation)
        paymentCompleted: { type: Boolean, default: false },
        paymentCompletedAt: { type: Date },
        stripePaymentId: { type: String, default: '' },
        paymentAmount: { type: Number, default: 0 },

        // Step 3: Strategy Call
        strategyCallBooked: { type: Boolean, default: false },
        strategyCallBookedAt: { type: Date },
        strategyCallDate: { type: Date },
        calendarEventId: { type: String, default: '' },

        // Step 4: Shoot Day Scheduled
        shootDayScheduled: { type: Boolean, default: false },
        shootDayScheduledAt: { type: Date },
        shootDate: { type: Date },

        // Notifications & Reminders
        paymentLinkSentAt: { type: Date },
        calendarLinkSentAt: { type: Date },
        shootReminderSentAt: { type: Date },

        status: {
            type: String,
            enum: ['form_pending', 'payment_pending', 'call_pending', 'shoot_pending', 'completed', 'stalled'],
            default: 'form_pending',
        },
        notes: { type: String, default: '' },
        isExistingUser: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Onboarding', onboardingSchema);
