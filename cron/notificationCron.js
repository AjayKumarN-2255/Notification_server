const cron = require('node-cron');
const { processNotification } = require('./processNotific');

let notificationCron;
const startCrons = async () => {
    if (!notificationCron) {
        notificationCron = cron.schedule(
            '0 25 17 * * *',
            async () => {
    console.log('Running daily job at 5:55 PM');
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