const Notification = require('../../models/Notification');
const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');


async function deleteNotification(nId, userId) {
    const notification = await Notification.findOne({ _id: nId, user_id: userId });

    if (!notification) {
        throw new APIError(STATUS_CODES.NOT_FOUND, 'Notification not found or access denied');
    }

    await notification.deleteOne();
    return notification;
}

module.exports = {
    deleteNotification
}