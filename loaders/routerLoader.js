const authRouter = require('../routes/authRouter');
const adminRouter = require('../routes/adminRouter');
const categoryRouter = require('../routes/categoryRouter');

function routerLoader(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/admin', adminRouter);
    app.use('/api/category',categoryRouter);
}

module.exports = {
    routerLoader
}