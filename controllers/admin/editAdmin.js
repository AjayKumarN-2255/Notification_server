const adminService = require('../../services/admin');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const adminSchema = require('../../validators/adminUpdateSchema');
const { validateWithSchema } = require('../../utils/schemaValidation');

async function editAdmin(req, res, next) {

    const { id } = req.params;

    const payLoad = req.body;
    if (!payLoad) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, 'Request body is missing or empty'));
    }

    const { error } = validateWithSchema(adminSchema, payLoad);
    if (error) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, error.details[0].message));
    }

    try {
        await adminService.editAdmin(id, payLoad);
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: 'Admin data updated successfully',
        })
    } catch (error) {
        next(error);
    }

}

module.exports = {
    editAdmin
};