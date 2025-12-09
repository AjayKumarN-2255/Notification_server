const Notification = require('../../models/Notification');
const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const { validateNotificationPayload } = require('../../utils/schemaValidation');

async function editNotification(payLoad, userId, nId) {
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
            notific_gap_unit,
            notify_channels
        } = payLoad;

        const notification = await Notification.findOne({
            _id: nId,
            user_id: userId
        })
        if (!notification) {
            throw new APIError(STATUS_CODES.NOT_FOUND, "Notification does not exist");
        }

        const next_notification_date = notification_date;

        validateNotificationPayload({
            notify_before,
            notify_before_unit,
            notification_date,
            notification_frequency,
            notific_gap_unit,
            frequency
        });

        const updatedNotification = await Notification.findByIdAndUpdate(
            nId,
            {
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
                notify_channels
            },
            { new: true }
        );

        const {
            last_notification_sent: lns,
            notify_user_list: nul,
            notification_frequency: nf,
            user_id,
            ...neededFields
        } = updatedNotification.toJSON();

        return neededFields;

    } catch (error) {
        console.log(error)
        if (error instanceof APIError) {
            throw error;
        }
        throw new APIError(STATUS_CODES.INTERNAL_SERVER_ERROR, 'Failed to edit notification');
    }
}

module.exports = {
    editNotification
};


//here frequency in month, 1-->1 month , all other in days 