const cron = require('node-cron');
const { processNotification } = require('./processNotific');

let notificationCron;
const startCrons = async () => {
    if (!notificationCron) {
        notificationCron = cron.schedule(
            '0 0 9 * * *',
            async () => {
    console.log('Running daily job at  9:00 AM');
    await processNotification();
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