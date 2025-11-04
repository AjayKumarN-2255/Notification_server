const adminService = require('../../services/admin');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');

async function getAllAdmins(req, res, next) {

    try {
        const admins = await adminService.getAllAdmins();
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