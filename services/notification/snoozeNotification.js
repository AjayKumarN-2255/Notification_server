const Notification = require('../../models/Notification');
const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');


async function snoozeNotification(nId, userId) {

    const notification = await Notification.findOne({ _id: nId, user_id: userId },'title description is_snoozed is_active category_name next_notification_date');

    if (!notification) {
        throw new APIError(STATUS_CODES.NOT_FOUND, 'Notification not found or access denied');
    }

    notification.is_snoozed = !notification.is_snoozed;
    await notification.save();
    return { notification: notification, is_snoozed: notification.is_snoozed }
}

module.exports = {
    snoozeNotification
}

