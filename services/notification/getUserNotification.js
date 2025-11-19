const Notification = require('../../models/Notification');

async function getUserNotification(Query) {
    const { userId, categories, searchTerm, from, to } = Query;
    let fromDate;
    let toDate;
    if (from) {
        fromDate = new Date(from);
        fromDate.setHours(0, 0, 0, 0);
    }

    if (to) {
        toDate = new Date(to);
        toDate.setHours(23, 59, 59, 999);
    }

    const notifications = await Notification.find({
        user_id: userId,
        ...(categories.length > 0 ? { category_names: { $in: categories } } : {}),
        ...(searchTerm && searchTerm.trim() !== "" ? { title: { $regex: searchTerm.trim(), $options: "i" } } : {}),
        ...(from ? { next_notification_date: { $gte: fromDate } } : {}),
        ...(to ? { next_notification_date: { $lte: toDate } } : {}),
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