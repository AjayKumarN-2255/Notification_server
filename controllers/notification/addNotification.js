const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const notificationSchema = require('../../validators/notificationSchema');
const { validateWithSchema } = require('../../utils/schemaValidation');
const notificationService = require('../../services/notification');


async function addNotification(req, res, next) {
    const payLoad = req.body
    if (!payLoad) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, 'Request body is missing or empty'));
    }

    const { error } = validateWithSchema(notificationSchema, payLoad);
    if (error) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, error.details[0].message));
    }

    try {
        const notification = await notificationService.addNotification(payLoad);

        res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: 'notification created successfully',
            data: notification
        });

    } catch (error) {
        next(error);
    }

}

module.exports = {
    addNotification
}