const Notification = require('../../models/Notification');

async function getUserNotification(userId) {
    const notifications = await Notification.find({ user_id: userId }, 'title description is_snoozed is_active category_name next_notification_date')
        .sort({ createdAt: -1 });
    return notifications;
}

module.exports = {
    getUserNotification
}