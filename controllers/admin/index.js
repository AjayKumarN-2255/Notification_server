const { addAdmin } = require('./addAdmin');
const { getAllAdmins } = require('./getAllAdmins');
const { editAdmin } = require('./editAdmin');
const { deleteAdmin } = require('./deleteAdmin');


module.exports = {
    addAdmin,
    editAdmin,
    deleteAdmin,
    getAllAdmins
}