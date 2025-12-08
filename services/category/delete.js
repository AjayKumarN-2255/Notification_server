const Notification = require('../../models/Notification');
const Category = require('../../models/Category');
const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');

async function deleteCategory(payLoad) {

    if (!payLoad.name) {
        throw new APIError(STATUS_CODES.BAD_REQUEST, "category required");
    }

    const { name } = payLoad;

    const exists = await Notification.exists({ category_names: name });

    if (exists) {
        throw new APIError(
            STATUS_CODES.BAD_REQUEST,
            "Category associated Notification exists"
        );
    }

    await Category.deleteOne({ name });
}

module.exports = {
    deleteCategory
}