const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const authService = require('../../services/auth');


async function changePassword(req, res, next) {

    const payLoad = req.body;
    if (!payLoad) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, 'Request body is missing or empty'));
    }

    try {
        await authService.changePassword(payLoad);
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: "Password changed successfully",
        })
    } catch (error) {
        next(error);
    }

}

module.exports = {
    changePassword
}