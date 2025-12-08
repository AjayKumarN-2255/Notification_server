const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const categoryService = require('../../services/category');

async function deleteCategory(req, res, next) {
    const payLoad = req.body;
    if (!payLoad) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, 'Request body is missing or empty'));
    }
    try {
        await categoryService.deleteCategory(payLoad);
        res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: 'category deleted successfully'
        });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    deleteCategory
}