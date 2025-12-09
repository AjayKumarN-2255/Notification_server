const mongoose = require('mongoose');
const { APIError } = require('../shared/error/APIError');
const { STATUS_CODES } = require('../shared/constants/statusCodes');

function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

function validateWithSchema(schema, payload) {
    const result = schema.validate(payload);
    return result;
}

function validateNotificationPayload(payload) {
    const {
        notify_before,
        notify_before_unit,
        notification_date,
        notification_frequency,
        notific_gap_unit,
        frequency
    } = payload;

    const unitToValue = { "Day": 1, "Week": 7, "Month": 30 }
    if (notify_before <= 0) {
        throw new APIError(STATUS_CODES.BAD_REQUEST, "Notify before must be greater than 0");
    }

    const frequencyInDays = frequency * 30;
    const notify_before_Indays = notify_before * unitToValue[notify_before_unit]
    if (notify_before_Indays >= frequencyInDays) {
        throw new APIError(
            STATUS_CODES.BAD_REQUEST,
            "Notify before cannot be greater than frequency"
        );
    }

    const notification_frequency_Indays = notification_frequency * unitToValue[notific_gap_unit];
    if (notify_before_Indays <= notification_frequency_Indays) {
        throw new APIError(STATUS_CODES.BAD_REQUEST, "Notification frequency cannot be greater than Notify before");
    }

    if (!notification_date) {
        throw new APIError(STATUS_CODES.BAD_REQUEST, "Notification date required");
    }

    if (!frequency || frequency <= 0) {
        throw new APIError(STATUS_CODES.BAD_REQUEST, "Frequency must be greater than 0");
    }

}


module.exports = {
    validateWithSchema,
    isValidObjectId,
    validateNotificationPayload
};