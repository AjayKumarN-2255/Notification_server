const Notification = require('../../models/Notification');

async function getUserNotification(userId, categories, searchTerm) {
    const notifications = await Notification.find({
        user_id: userId,
        ...(categories.length > 0 ? { category_names: { $in: categories } } : {}),
        ...(searchTerm && searchTerm.trim() !== "" ? { title: { $regex: searchTerm.trim(), $options: "i" } } : {}),
    },
        `_id title description 
        is_snoozed is_active category_names next_notification_date notification_frequency  notify_before notify_before_unit notific_gap_unit frequency`
    )
        .sort({ createdAt: -1 });

    return notifications;
}

module.exports = {
    getUserNotification
}