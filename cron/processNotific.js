const { fetchNotification } = require('./services');
const { loadTemplate, fillTemplate } = require('../shared/templates/mailTemplateHandler');

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
        const last_day_mail_template = loadTemplate('last_day.html');
        const inter_day_mail_template = loadTemplate('intermediate_day.html');
        let template;

        const successNotId = await Promise.all(
            notifications.map(async (noti) => {
                return await Promise.all(
                    noti.notify_user_list.map((user, ind) => {
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
                        
                    })
                )
            })
        );
    } catch (error) {
        console.log(error)
    }

}

processNotification()

module.exports = {
    processNotification
}