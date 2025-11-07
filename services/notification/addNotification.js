const Notification = require('../../models/Notification');
const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');

async function addNotification(payLoad) {
    try {
        const {
            user_id,
            title,
            description,
            category_name,
            notification_date,
            notify_user_list,
            frequency,
            notification_frequency,
        } = payLoad;

        const is_snoozed = false;
        const is_active = true;
        const last_notification_sent = null;
        const next_notification_date = notification_date;

        const newNotification = new Notification({
            user_id,
            title,
            description,
            category_name,
            notification_date,
            next_notification_date,
            notify_user_list,
            frequency,
            notification_frequency,
            last_notification_sent,
            is_snoozed,
            is_active
        });

        const savedNotification = await newNotification.save();

        return savedNotification;
    } catch (error) {
        console.log(error)
        throw new APIError(STATUS_CODES.INTERNAL_SERVER_ERROR, 'Failed to add notification');
    }
}

module.exports = {
    addNotification
};
