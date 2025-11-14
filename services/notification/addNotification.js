const Notification = require('../../models/Notification');
const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const { validateNotificationPayload } = require('../../utils/schemaValidation');

async function addNotification(payLoad, userId) {
    try {
        const {
            title,
            description,
            category_names,
            notification_date,
            notify_user_list,
            frequency,
            notification_frequency,
            notify_before,
            notify_before_unit,
            notific_gap_unit
        } = payLoad;

        const is_snoozed = false;
        const is_active = true;
        const last_notification_sent = null;
        const next_notification_date = notification_date;
        notify_user_list.push(userId);

        validateNotificationPayload({
            notify_before,
            notify_before_unit,
            notification_date,
            notification_frequency,
            notific_gap_unit,
            frequency
        });

        const newNotification = new Notification({
            user_id: userId,
            title,
            description,
            category_names,
            notification_date,
            next_notification_date,
            notify_user_list,
            notify_before,
            frequency,
            notify_before_unit,
            notific_gap_unit,
            notification_frequency,
            last_notification_sent,
            is_snoozed,
            is_active
        });

        const savedNotification = await newNotification.save();
        const {
            last_notification_sent: lns,
            notify_user_list: nul,
            notification_frequency: nf,
            user_id,
            ...neededFields
        } = savedNotification.toJSON();

        return neededFields;
    } catch (error) {
        if (error instanceof APIError) {
            throw error;
        }
        throw new APIError(STATUS_CODES.INTERNAL_SERVER_ERROR, 'Failed to add notification');
    }
}

module.exports = {
    addNotification
};


//here frequency in month, 1-->1 month , all other in days 