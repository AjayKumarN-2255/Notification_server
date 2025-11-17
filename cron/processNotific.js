const { fetchNotification, sendNotification, updateLastSendDate, updateNotification, saveNotificationLogs } = require('./services');
const { loadMailTemplate, loadMsgTemplate } = require('../shared/templates/mailTemplateHandler');
const pLimit = require('p-limit').default;
const notificLimit = pLimit(2);
const userLimit = pLimit(5);

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
            notifications.map(noti =>
                notificLimit(async () => {
                    return await Promise.all(
                        noti.notify_user_list.map(user =>
                            userLimit(async () => {
                                const data = {
                                    title: noti.title,
                                    username: user.username,
                                    description: noti.description,
                                    categories: noti.category_names
                                };
                                const isLastDay = compateDatewithToday(noti.next_notification_date);
                                if (!isLastDay) {
                                    data.next_notification_date = new Date(noti.next_notification_date).toDateString();
                                }
                                const mailTemplate = Handlebars.compile(
                                    isLastDay ? last_day_mail_template : inter_day_mail_template
                                )(data);
                                const msgTemplate = Handlebars.compile(
                                    isLastDay ? last_day_msg_template : inter_day_msg_template
                                )(data);
                                return await sendNotification(mailTemplate, msgTemplate, user.email, user.phone, user._id);
                            })
                        )
                    );
                })
            )
        );
        console.log(nRes);
        await saveNotificationLogs(notificatonIds, nRes);
        await updateLastSendDate(notificatonIds);
    } catch (error) {
        console.log(error)
    } finally {
        await updateNotification();
    }

}

processNotification()

module.exports = {
    processNotification
}