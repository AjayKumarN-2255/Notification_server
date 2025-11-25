const User = require('../../models/User');
const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');

async function editAdmin(id, payLoad) {

    const admin = await User.findById(id);
    if (!admin) {
        throw new APIError(STATUS_CODES.NOT_FOUND, 'Admin not found');
    }

    const { username, email, phone } = payLoad;

    admin.username = username;
    admin.email = email;
    admin.phone = phone;

    await admin.save();
}

module.exports = {
    editAdmin
}