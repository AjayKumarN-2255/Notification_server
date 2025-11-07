const Joi = require('joi');

const notificationSchema = Joi.object({
    user_id: Joi.string()
        .required()
        .messages({
            'string.empty': 'User ID is required'
        }),
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
    category_name: Joi.string()
        .max(50)
        .required()
        .messages({
            'string.empty': 'Category name is required',
            'string.max': 'Category name cannot exceed 50 characters'
        }),
    notification_date: Joi.date()
        .required()
        .messages({
            'date.base': 'Notification date must be a valid date',
            'any.required': 'Notification date is required'
        }),
    next_notification_date: Joi.date()
        .required()
        .messages({
            'date.base': 'Next notification date must be a valid date',
            'any.required': 'Next notification date is required'
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
    last_notification_sent: Joi.date()
        .required()
        .messages({
            'date.base': 'Last notification sent must be a valid date',
            'any.required': 'Last notification sent is required'
        }),
    is_snoozed: Joi.boolean()
        .required()
        .messages({
            'boolean.base': 'is_snoozed must be a boolean',
            'any.required': 'is_snoozed is required'
        }),
    is_active: Joi.boolean()
        .required()
        .messages({
            'boolean.base': 'is_active must be a boolean',
            'any.required': 'is_active is required'
        })
});

module.exports = notificationSchema;
