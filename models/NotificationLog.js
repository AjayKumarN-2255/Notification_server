const mongoose = require('mongoose');
const Notification = require('./Notification');
const User = require('./User');

const notificatonLogSchema = new mongoose.Schema({
    notification_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Notification'
    },
    sent_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    mailSuccessUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    mailFailedUsers: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            error: { type: String, required: true }
        }
    ],
    msgSuccessUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    msgFailedUsers: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            error: { type: String, required: true }
        }
    ]
});

module.exports = mongoose.model('NotificationLog', notificatonLogSchema);
