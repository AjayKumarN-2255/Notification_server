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
        notification_date,
        notification_frequency,
        frequency
    } = payload;

    if (notify_before <= 0) {
        throw new APIError(STATUS_CODES.BAD_REQUEST, "Notify before must be greater than 0");
    }

    const frequencyInDays = frequency * 30;  
    if (notify_before >= frequencyInDays) {
        throw new APIError(
            STATUS_CODES.BAD_REQUEST,
            "Notify before cannot be greater than frequency"
        );
    }

    if (notify_before < notification_frequency) {
        throw new APIError(STATUS_CODES.BAD_REQUEST, "Notification frequency cannot be greater than Notify before");
    }

    if (!notification_date || new Date(notification_date) < new Date()) {
        throw new APIError(STATUS_CODES.BAD_REQUEST, "Notification date must be in the future");
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