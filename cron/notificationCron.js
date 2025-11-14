const cron = require('node-cron');
const { fetchNotification } = require('./services');

let notificationCron;
console.log("this running on importing ")
const startCrons = () => {
    if (!notificationCron) {
        notificationCron = cron.schedule(
            '* * * * * *',
            async () => {
                await fetchNotification();
            },
            {
                scheduled: false,
            }
        );
    }
    notificationCron.start();
};

const stopCrons = () => {
    if (notificationCron) {
        notificationCron.stop();
    }
};

module.exports = {
    startCrons,
    stopCrons,
};