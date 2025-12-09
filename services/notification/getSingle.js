const Notification = require('../../models/Notification');
const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');


async function getSingleNotification(userId, notiId) {

    const notification = await Notification.findOne({
        user_id: userId,
        _id: notiId
    }, `_id title description notify_user_list notify_channels
        category_names next_notification_date notification_frequency  notify_before notify_before_unit notific_gap_unit frequency`
    ).populate('notify_user_list', '_id username').lean();;

    if (!notification) {
        throw new APIError(STATUS_CODES.NOT_FOUND, "Notification does not exist")
    }

    return notification;
}

module.exports = {
    getSingleNotification
}
