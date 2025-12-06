const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const authService = require('../../services/auth');

async function editDetails(req, res, next) {
    const userId = req.params.id;
    const payLoad = req.body;

    if (!payLoad) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, 'Request body is missing or empty'));
    }

    try {
        const savedUser = await authService.editDetails(userId, payLoad);
        res.status(STATUS_CODES.OK).json({
            success: true,
            data: savedUser,
            message: 'User data updated successfully',
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    editDetails
}