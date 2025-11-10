const Notification = require('../../models/Notification');
const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');


async function stopNotification(nId, userId) {
    const notification = await Notification.findOne({ _id: nId, user_id: userId },'title description is_snoozed is_active category_name next_notification_date');

    if (!notification) {
        throw new APIError(STATUS_CODES.NOT_FOUND, 'Notification not found or access denied');
    }

    notification.is_active = !notification.is_active;
    await notification.save();
    return { notification: notification, is_active: notification.is_active }
}

module.exports = {
    stopNotification
}