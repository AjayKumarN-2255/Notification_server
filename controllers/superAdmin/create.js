const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const adminSchema = require('../../validators/adminSchema');
const { validateWithSchema } = require('../../utils/schemaValidation');
const superAdminService = require('../../services/superAdmin/create');


async function addSuperAdmin(req, res, next) {

    const payLoad = req.body;
    if (!payLoad) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, 'Request body is missing or empty'));
    }

    const { error } = validateWithSchema(adminSchema, payLoad);
    if (error) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, error.details[0].message));
    }

    try {
        const response = await superAdminService.addSuperAdmin(payLoad);
        res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: 'super-admin created successfully',
            data: response
        });
    } catch (error) {
        next(error);
    }

}


module.exports = {
    addSuperAdmin
};