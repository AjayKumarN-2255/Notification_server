const authRouter = require('../routes/authRouter');
const adminRouter = require('../routes/adminRouter');
const categoryRouter = require('../routes/categoryRouter');
const notificationRouter = require('../routes/notificRouter');

function routerLoader(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/admin', adminRouter);
    app.use('/api/category', categoryRouter);
    app.use('/api/notification', notificationRouter);
}

module.exports = {
    routerLoader
}