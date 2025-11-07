const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        required: true
    },
    category_name: {
        type: String,
        maxlength: 50
    },
    notification_date: {
        type: Date,
        required: true,
        get: val => val ? val.toLocaleDateString('en-GB') : null
    },
    next_notification_date: {
        type: Date,
        get: val => val ? val.toLocaleDateString('en-GB') : null
    },
    notify_user_list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    frequency: {
        type: Number,
        default: 0
    },
    notification_frequency: {
        type: Number,
        default: 0
    },
    last_notification_sent: {
        type: Date,
        get: val => val ? val.toLocaleDateString('en-GB') : null
    },
    is_snoozed: {
        type: Boolean,
        default: false
    },
    is_active: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true }
});

module.exports = mongoose.model('Notification', NotificationSchema);
