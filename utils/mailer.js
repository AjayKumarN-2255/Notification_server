const nodemailer = require('nodemailer');
const { loadMailTemplate } = require('../shared/templates/mailTemplateHandler');
const Handlebars = require('handlebars');

const last_day_mail_template = loadMailTemplate('last_day.html');
const inter_day_mail_template = loadMailTemplate('intermediate_day.html');

// const last_day_msg_template = loadMsgTemplate('last_day.txt');
// const inter_day_msg_template = loadMsgTemplate('intermediate_day.txt');
// const msgTemplate = Handlebars.compile(
//     isLastDay ? last_day_msg_template : inter_day_msg_template
// )(data);

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    pool: true,
    maxConnections: 10,
    auth: {
        user: 'kumar.ajay@midnay.com',
        pass: 'uvsamphskitvrlzc'
    }
});


async function sendMail(data, isLastDay, email, retry = 3, delay = 2000) {

    const mailTemplate = Handlebars.compile(
        isLastDay ? last_day_mail_template : inter_day_mail_template
    )(data);

    try {
        const info = await transporter.sendMail({
            from: 'kumar.ajay@midnay.com',
            to: email,
            subject: data.title,
            html: mailTemplate,
        });
        console.log("Email sent:", info.messageId);
    } catch (error) {
        console.log("Error while sending mail:", error.message);
        if (retry > 0) {
            console.log(`Retrying in ${delay}ms... (${retry} retries left)`);
            await new Promise(res => setTimeout(res, delay));
            return await sendMail(data, isLastDay, email, retry - 1, delay);
        } else {
            console.log("All retries failed for", email);
            return false;
        }
    }

    return true;
}

module.exports = { sendMail };
