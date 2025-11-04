const Joi = require('joi');

const userLoginSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': 'Username must be a string',
            'string.empty': 'Username is required',
            'string.min': 'Username must be at least 3 characters',
            'string.max': 'Username must be at most 30 characters'
        }),
    
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Email must be a valid email address',
            'string.empty': 'Email is required'
        }),
    
    phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            'string.pattern.base': 'Phone number must be 10 digits',
            'string.empty': 'Phone number is required'
        }),
    
    // role: Joi.string()
    //     .valid('super-admin', 'admin')
    //     .default('admin')
    //     .messages({
    //         'any.only': 'Role must be either "super-admin" or "admin"'
    //     }),
    
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.min': 'Password must be at least 6 characters',
            'string.empty': 'Password is required'
        })
});

module.exports = userLoginSchema;
