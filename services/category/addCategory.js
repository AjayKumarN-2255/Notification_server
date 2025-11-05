const Category = require('../../models/Category');
const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');

async function addCategory(payLoad) {
    const { name } = payLoad;
    const category = await Category.findOne({ name: { $eq: name } });
    if (category) {
        throw new APIError(STATUS_CODES.CONFLICT, "Category already exists");
    }

    const newCategory = await Category.create({ name });

    return newCategory.toObject();
}


module.exports = {
    addCategory
}