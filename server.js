const { app, Loader } = require('./app');
const { startCrons } = require('./cron/notificationCron');

(async () => {
    await Loader();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log("Server running successfully on port", PORT);
        startCrons();
    });
})();
