const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const notificationService = require('../../services/notification');


async function getUserNotification(req, res, next) {
    try {
        const userId = req.user.id
        const notifications = await notificationService.getUserNotification(userId);
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: 'notifications fetched successfully',
            data: notifications
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUserNotification
}