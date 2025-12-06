const User = require('../../models/User');
const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const bcrypt = require('bcrypt');

async function addSuperAdmin(payLoad) {
    const { username, email, phone, password } = payLoad;
    const role = "super-admin";
    const isExist = await User.findOne({ role: 'super-admin' })
    if (isExist) {
        throw new APIError(STATUS_CODES.CONFLICT, "Super Admin already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        email,
        phone,
        role,
        password: hashedPassword
    })

    const savedUser = await newUser.save();
    const { password: pass, ...userWithoutPassword } = savedUser._doc;
    return userWithoutPassword;
}


module.exports = {
    addSuperAdmin
};