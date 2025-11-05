const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const categoryService = require('../../services/category');


async function getAllCategory(req, res, next) {
    try {
        const categories = await categoryService.getAllCategory();
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: 'categories fetched successfully',
            data: categories
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllCategory
}