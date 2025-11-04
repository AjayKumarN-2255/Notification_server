const authRouter = require('../routes/authRouter');
const adminRouter = require('../routes/adminRouter');

function routerLoader(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/admin', adminRouter);
}

module.exports = {
    routerLoader
}