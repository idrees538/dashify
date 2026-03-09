const mongoose = require('mongoose');

const cycleHistorySchema = new mongoose.Schema(
    {
        cycleStart: { type: Date, required: true },
        cycleEnd: { type: Date, required: true },
        price: { type: Number, required: true },
        paidAt: { type: Date, default: Date.now },
    },
    { _id: false }
);

const subscriptionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        status: {
            type: String,
            enum: ['active', 'cancelled', 'lapsed'],
            default: 'active',
        },
        currentCycleStart: {
            type: Date,
            required: true,
        },
        currentCycleEnd: {
            type: Date,
            required: true,
        },
        consecutiveMonths: {
            type: Number,
            default: 1,
        },
        priceThisCycle: {
            type: Number,
            required: true,
        },
        stripeSubscriptionId: {
            type: String,
            default: '',
        },
        history: {
            type: [cycleHistorySchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

subscriptionSchema.index({ status: 1 });

// Pricing constants
subscriptionSchema.statics.FIRST_MONTH_PRICE = 375;
subscriptionSchema.statics.CONSECUTIVE_PRICE = 275;

module.exports = mongoose.model('Subscription', subscriptionSchema);
