const axios = require('axios');

async function sendMessage(data, isLastDay, phone, retries = 3) {
    const template_name = isLastDay ? 'final_reminder_v2' : 'intermediate_day_v4';
    const parameters = [
        { type: "text", text: data.title },
        { type: "text", text: data.username },
        { type: "text", text: data.description }
    ];

    if (!isLastDay && data.next_notification_date) {
        parameters.push({ type: "text", text: data.next_notification_date });
    }

    const messageBody = {
        messaging_product: "whatsapp",
        to: `91${phone}`,
        type: "template",
        template: {
            name: template_name,
            language: { code: "en_US" },
            components: [
                { type: "body", parameters }
            ]
        }
    };

    try {
        const response = await axios.post(
            `https://graph.facebook.com/${process.env.WA_API_VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
            messageBody,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.WA_PERMANENT_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('WhatsApp Response:', response.data.messages[0].status);
        return true;

    } catch (error) {
        console.error('Error sending WhatsApp message:', error.response?.data || error.message);

        if (retries > 0) {
            console.log(`Retrying... attempts left: ${retries}`);
            return sendMessage(data, isLastDay, phone, retries - 1);
        }
        throw error;
    }
}

module.exports = {
    sendMessage
};
