const User = require("../../models/User");

async function getAllAdmins() {
    const admins = await User.find({ role: "admin" }, "username _id")
    return admins;
}

module.exports = {
    getAllAdmins
};