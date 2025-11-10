const Notification = require('../../models/Notification');

async function getUserNotification(userId) {
    const notifications = await Notification.find({ user_id: userId }, 'title description is_snoozed is_active category_name frequency next_notification_date');
    return notifications;
}

module.exports = {
    getUserNotification
}