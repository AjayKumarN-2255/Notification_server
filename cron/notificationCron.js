const cron = require('node-cron');

let notificationCron;
console.log("this running on importing ")
const startCrons = () => {
    if (!notificationCron) {
        notificationCron = cron.schedule(
            '* * * * * *',
            async () => {
                console.log('Running daily notification job...');
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