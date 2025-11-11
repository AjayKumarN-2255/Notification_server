const adminService = require('../../services/admin');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');

async function getAllAdmins(req, res, next) {

    const userId = req.user.id
    try {
        const admins = await adminService.getAllAdmins(userId);
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: 'Admins fetched successfully',
            data: admins
        })
    } catch (error) {
        next(error);
    }

}

module.exports = {
    getAllAdmins
};