const Joi = require('joi');
const mongoose = require('mongoose');

const notificationSchema = Joi.object({
    title: Joi.string()
        .max(50)
        .required()
        .messages({
            'string.empty': 'Title is required',
            'string.max': 'Title cannot exceed 50 characters'
        }),
    description: Joi.string()
        .required()
        .messages({
            'string.empty': 'Description is required',
            'string.base': 'Description must be a string'
        }),
    category_names: Joi.array()
        .max(50)
        .required()
        .messages({
            'array.base': 'category_names must be an array',
            'array.min': 'category_names cannot be empty',
            'any.required': 'category_names is required'
        }),
    notify_before_unit: Joi.string()
        .valid('Day', 'Week', 'Month')
        .required()
        .messages({
            'any.required': 'notify_before_unit is required',
            'any.only': 'notify_before_unit must be one of [day, week, month]'
        }),
    notific_gap_unit: Joi.string()
        .required()
        .messages({
            'any.required': 'notific_gap_unit is required'
        }),
    notification_date: Joi.date()
        .required()
        .messages({
            'date.base': 'Notification date must be a valid date',
            'any.required': 'Notification date is required'
        }),
    frequency: Joi.number()
        .required()
        .messages({
            'number.base': 'Frequency must be a number',
            'any.required': 'Frequency is required'
        }),
    notification_frequency: Joi.number()
        .required()
        .messages({
            'number.base': 'Notification frequency must be a number',
            'any.required': 'Notification frequency is required'
        }),
    notify_before: Joi.number()
        .required()
        .messages({
            'number.base': 'Notify before date must be a number',
            'any.required': 'Notify before is required'
        }),
    notify_user_list: Joi.array()
        .items(
            Joi.string()
                .required()
                .custom((value, helpers) => {
                    if (!mongoose.Types.ObjectId.isValid(value)) {
                        return helpers.message(`Invalid user ID: ${value}`);
                    }
                    return value;
                })
                .messages({
                    'string.base': 'Each user ID must be a string',
                    'any.required': 'User ID cannot be empty'
                })
        )
        .min(1)
        .required()
        .messages({
            'array.base': 'notify_user_list must be an array',
            'array.min': 'notify_user_list cannot be empty',
            'any.required': 'notify_user_list is required'
        })
});

module.exports = notificationSchema;
