const mongoose = require('mongoose');

const timeBlockSchema = new mongoose.Schema(
    {
        dayOfWeek: {
            type: Number,
            required: true,
            min: 0,
            max: 6, // 0=Sunday, 1=Monday, etc.
        },
        startTime: {
            type: String,
            required: true, // Format: "HH:mm"
        },
        endTime: {
            type: String,
            required: true, // Format: "HH:mm"
        },
        label: {
            type: String,
            default: 'Available Slot',
        },
        type: {
            type: String,
            enum: ['shoot', 'call', 'any'],
            default: 'any',
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('TimeBlock', timeBlockSchema);
