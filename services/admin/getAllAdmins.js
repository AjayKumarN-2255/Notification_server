const User = require("../../models/User");

async function getAllAdmins(userId, adminId) {
    const admins = await User.find(
        {
            role: "admin",
            _id: { $ne: userId },
            ...(adminId && { _id: { $eq: adminId } })
        },
        "username _id phone email")
    return admins;
}

module.exports = {
    getAllAdmins
};