const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const notificationService = require('../../services/notification');
const { isValidObjectId } = require('../../utils/schemaValidation');

async function snoozeNotification(req, res, next) {
    const userId = req.user.id;
    const nId = req.params.id;
    if (!nId) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, 'notification id is required'));
    }
    if (!isValidObjectId(nId)) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, 'invalid notification id'));
    }
    try {
        const response = await notificationService.snoozeNotification(nId, userId);
        const { notification, is_snoozed } = response;
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: is_snoozed ? 'notification snoozed successfully' : 'Notification unsnoozed successfully',
            data: notification
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    snoozeNotification
}

