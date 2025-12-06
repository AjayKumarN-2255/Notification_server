const { Login } = require('./Login');
const { refreshToken } = require('./refreshToken');
const { Logout } = require('./Logout');
const { editDetails } = require('./editDetails');


module.exports = {
    Login,
    Logout,
    refreshToken,
    editDetails
}