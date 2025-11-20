const { fetchNotification, sendNotification, updateLastSendDate, updateNotification, saveNotificationLogs } = require('./services');

const pLimit = require('p-limit').default;
const notificLimit = pLimit(2);
const userLimit = pLimit(5);


function compateDatewithToday(date) {
    const today = new Date('2025-11-27');
    today.setHours(0, 0, 0, 0);

    const nextNotification = new Date(date);
    nextNotification.setHours(0, 0, 0, 0);
    return today.getTime() === nextNotification.getTime();
}

async function processNotification() {

    try {
        const notifications = await fetchNotification();
        const notificatonIds = notifications.map((noti) => noti._id);

        if (!notifications || notifications.length === 0) {
            console.log("No notifications to process");
            return;
        }

        const nRes = await Promise.all(
            notifications.map(noti =>
                notificLimit(() =>
                    Promise.all(
                        noti.notify_user_list.map(user =>
                            userLimit(async () => {
                                const data = {
                                    title: noti.title,
                                    username: user.username,
                                    description: noti.description,
                                    categories: noti.category_names,
                                };

                                const isLastDay = compateDatewithToday(noti.next_notification_date);
                                if (!isLastDay) {
                                    data.next_notification_date = new Date(noti.next_notification_date).toDateString();
                                }
                                return await sendNotification(data, isLastDay, user.email, user.phone, user._id);
                            })
                        )
                    )
                )
            )
        );

        await saveNotificationLogs(notificatonIds, nRes);
        await updateLastSendDate(notificatonIds);
    } catch (error) {
        console.log(error)
    } finally {
        await updateNotification();
    }

}


module.exports = {
    processNotification
}