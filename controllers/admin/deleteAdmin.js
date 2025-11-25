const adminService = require('../../services/admin');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');

async function deleteAdmin(req, res, next) {
    const { id } = req.params;
    try {
        const adminId = await adminService.deleteAdmin(id);
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: 'Admin data deleted successfully',
            data: adminId
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    deleteAdmin
};