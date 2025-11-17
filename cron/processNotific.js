const { fetchNotification, sendNotification, updateLastSendDate, updateNotification, saveNotificationLogs } = require('./services');
const { loadMailTemplate, loadMsgTemplate } = require('../shared/templates/mailTemplateHandler');

const Handlebars = require('handlebars');

function compateDatewithToday(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextNotification = new Date(date);
    nextNotification.setHours(0, 0, 0, 0);
    return today === nextNotification;
}

async function processNotification() {

    try {
        const notifications = await fetchNotification();
        const notificatonIds = notifications.map((noti) => noti._id);

        if (!notifications || notifications.length === 0) {
            console.log("No notifications to process");
            return;
        }

        const last_day_mail_template = loadMailTemplate('last_day.html');
        const inter_day_mail_template = loadMailTemplate('intermediate_day.html');

        const last_day_msg_template = loadMsgTemplate('last_day.txt');
        const inter_day_msg_template = loadMsgTemplate('intermediate_day.txt');

        const nRes = await Promise.all(
            notifications.map(async (noti) => {
                return await Promise.all(
                    noti.notify_user_list.map(async (user) => {
                        const data = {
                            title: noti.title,
                            username: user.username,
                            description: noti.description,
                            categories: noti.category_names
                        };
                        const isLastDay = compateDatewithToday(noti.next_notification_date)
                        if (!isLastDay) {
                            const nextDate = new Date(noti.next_notification_date);
                            data.next_notification_date = nextDate.toDateString();
                        }
                        const mailTemplate = Handlebars.compile(isLastDay ? last_day_mail_template : inter_day_mail_template)(data);
                        const msgTemplate = Handlebars.compile(isLastDay ? last_day_msg_template : inter_day_msg_template)(data);
                        const result = await sendNotification(mailTemplate, msgTemplate, user?.email, user?.phone, user?._id);
                        return result;
                    })
                )
            })
        );

        await saveNotificationLogs(notificatonIds, nRes);
        await updateLastSendDate(notificatonIds);
    } catch (error) {
        console.log(error)
    } finally {
        await updateNotification();
    }

}

// processNotification()

module.exports = {
    processNotification
}