const { Login } = require('./Login');
const { refreshToken } = require('./refreshToken');
const { Logout } = require('./Logout');
const { editDetails } = require('./editDetails');
const { changePassword } = require('./changePassword');


module.exports = {
    Login,
    Logout,
    refreshToken,
    editDetails,
    changePassword
}