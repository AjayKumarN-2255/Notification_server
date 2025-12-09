const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const notificationService = require('../../services/notification');


async function getSingleNotification(req, res, next) {
    const userId = req.user.id;
    const { id } = req.params;
    if (!id) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, "notification id is required"));
    }
    
    try {
        const notification = await notificationService.getSingleNotification(userId, id);
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: 'notification fetched successfully',
            data: notification
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getSingleNotification
}
