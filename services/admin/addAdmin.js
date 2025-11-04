const User = require('../../models/User');
const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const bcrypt = require('bcrypt');

async function addAdmin(payLoad) {
    const { username, email, phone, password } = payLoad;
    const role = "admin";
    const [userByEmail, userByPhone] = await Promise.all([
        User.findOne({ email }),
        User.findOne({ phone })
    ]);

    if (userByEmail) {
        throw new APIError(STATUS_CODES.CONFLICT, "User with this email already exists");
    }

    if (userByPhone) {
        throw new APIError(STATUS_CODES.CONFLICT, "User with this phone number already exists");
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
    addAdmin
};