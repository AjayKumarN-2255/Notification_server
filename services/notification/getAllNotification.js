const Notification = require('../../models/Notification');

async function getAllNotification() {
    const notifications = await Notification.find({}, '_id title description is_snoozed is_active category_name frequency next_notification_date');
    return notifications;
}

module.exports = {
    getAllNotification
}