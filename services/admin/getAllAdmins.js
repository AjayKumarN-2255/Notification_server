const User = require("../../models/User");

async function getAllAdmins(userId) {
    const admins = await User.find({ role: "admin", _id: { $ne: userId } }, "username _id phone email")
    return admins;
}

module.exports = {
    getAllAdmins
};