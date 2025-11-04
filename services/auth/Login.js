const User = require('../../models/User');
const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/jwt');

async function Login(payLoad) {
    const { email, password } = payLoad;
    const user = await User.findOne({ email });
    if (!user) {
        throw new APIError(STATUS_CODES.UNAUTHORIZED, 'Invalid credentials');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new APIError(STATUS_CODES.UNAUTHORIZED, 'incorrect credentials');
    }

    const access_token = generateToken({ id: user?.id, role: user?.role }, "access");
    const refresh_token = generateToken({ id: user?.id, role: user?.role }, "refresh");

    return { access_token, refresh_token };
}

module.exports = {
    Login
}