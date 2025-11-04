const Joi = require('joi');

const categorySchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': 'Username must be a string',
            'string.empty': 'Username is required',
            'string.min': 'Username must be at least 3 characters',
            'string.max': 'Username must be at most 30 characters'
        }),
});

module.exports = categorySchema;
