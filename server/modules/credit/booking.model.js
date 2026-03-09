const mongoose = require('mongoose');

const deliverableSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['Performance Video', 'Day in the Life', 'Visualizer', 'Photography', 'Report', 'Other'],
            required: true,
        },
        creditCost: {
            type: Number,
            required: true,
            min: 1,
        },
        label: {
            type: String,
            default: '',
        },
    },
    { _id: false }
);

const bookingRequestSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        deliverables: {
            type: [deliverableSchema],
            required: true,
            validate: {
                validator: (v) => v.length > 0,
                message: 'At least one deliverable is required',
            },
        },
        totalCredits: {
            type: Number,
            required: true,
            min: 1,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected', 'cancelled'],
            default: 'pending',
        },
        adminNotes: {
            type: String,
            default: '',
        },
        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        approvedAt: {
            type: Date,
            default: null,
        },
        shootDate: {
            type: Date,
            default: null,
        },
        shootMonth: {
            type: Number,
            default: null,
        },
        shootYear: {
            type: Number,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

bookingRequestSchema.index({ user: 1, status: 1 });
bookingRequestSchema.index({ status: 1, createdAt: -1 });
bookingRequestSchema.index({ user: 1, shootMonth: 1, shootYear: 1 });

module.exports = mongoose.model('BookingRequest', bookingRequestSchema);
