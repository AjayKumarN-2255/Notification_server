const Category = require('../../models/Category');

async function getAllCategory() {
    const categories = await Category.find({ }, "name _id")
    return categories;
}

module.exports = {
    getAllCategory
}