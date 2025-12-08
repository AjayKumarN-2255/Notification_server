const User = require('../../models/User');
const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const bcrypt = require('bcrypt');

async function changePassword(payLoad) {

    if (!payLoad.email) {
        throw new APIError(STATUS_CODES.BAD_REQUEST, "email of user required");
    }

    if (!payLoad.password) {
        throw new APIError(STATUS_CODES.BAD_REQUEST, "password is required");
    }

    const { email, password } = payLoad;

    const user = await User.findOne({ email });

    if (!user) {
        throw new APIError(STATUS_CODES.NOT_FOUND, "user with this email is not found");
    }

    const newPassword = await bcrypt.hash(password, 10);

    user.password = newPassword;
    await user.save();
}

module.exports = {
    changePassword
}