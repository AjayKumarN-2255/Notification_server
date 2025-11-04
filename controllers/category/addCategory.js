const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const categorySchema = require('../../validators/categorySchema');
const { validateWithSchema } = require('../../utils/schemaValidation');
const categoryService = require('../../services/category');


async function addCategory(req, res, next) {
    const payLoad = req.body
    if (!payLoad) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, 'Request body is missing or empty'));
    }

    const { error } = validateWithSchema(categorySchema, payLoad);
    if (error) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, error.details[0].message));
    }

    try {
        const response = await categoryService.addCategory(payLoad);

    } catch (error) {
        next(error);
    }

}


module.exports = {
    addCategory
}