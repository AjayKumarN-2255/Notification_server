const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['super-admin', 'admin'],
        default: 'admin'
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);