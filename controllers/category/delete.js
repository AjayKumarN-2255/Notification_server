const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const categoryService = require('../../services/category');

async function deleteCategory(req, res, next) {
    const category = req.query.category;

    if (!category) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, 'category name is missing'));
    }
    try {
        await categoryService.deleteCategory({ name: category });
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