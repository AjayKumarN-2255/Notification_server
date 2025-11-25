const User = require('../../models/User');
const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');

async function deleteAdmin(id) {
    const admin = await User.findById(id);
    if (!admin) {
        throw new APIError(STATUS_CODES.NOT_FOUND, 'Admin not found');
    }
    await admin.deleteOne();
    return admin._id
}

module.exports = {
    deleteAdmin
}