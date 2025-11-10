const mongoose = require('mongoose');

function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

function validateWithSchema(schema, payload) {
    const result = schema.validate(payload);
    return result;
}

module.exports = {
    validateWithSchema,
    isValidObjectId
};