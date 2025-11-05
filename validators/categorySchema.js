const Joi = require('joi');

const categorySchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': 'category name must be a string',
            'string.empty': 'category name is required',
            'string.min': 'category name must be at least 3 characters',
            'string.max': 'category name must be at most 30 characters'
        }),
});

module.exports = categorySchema;
