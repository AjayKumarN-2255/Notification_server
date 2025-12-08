const User = require("../../models/User");

async function getAllAdmins(adminId) {
    const admins = await User.find(
        {
            role: "admin",
            ...(adminId && { _id: { $eq: adminId } })
        },
        "username _id phone email")
    return admins;
}

module.exports = {
    getAllAdmins
};