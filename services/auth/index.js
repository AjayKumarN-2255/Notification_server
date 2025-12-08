const { Login } = require('./Login');
const { refreshToken } = require('./refreshToken');
const { editDetails } = require('./editDetails');
const { changePassword } = require('./changePassword');


module.exports = {
    Login,
    refreshToken,
    editDetails,
    changePassword
}