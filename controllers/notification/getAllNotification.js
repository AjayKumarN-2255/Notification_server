const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const notificationService = require('../../services/notification');


async function getAllNotification(req, res, next) {
    try {
        const notifications = await notificationService.getAllNotification();
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: 'categories fetched successfully',
            data: notifications
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllNotification
}