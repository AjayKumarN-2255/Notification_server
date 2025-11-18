const cron = require('node-cron');
// const { processNotification } = require('./processNotific');

let notificationCron;
const startCrons = () => {
    if (!notificationCron) {
        notificationCron = cron.schedule(
            '0 26 14 * * *',
            async () => {
                console.log('Running daily job at 2:16 PM');
                // await processNotification();
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