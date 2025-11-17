const Notification = require('../models/Notification');
const NotificationLog = require('../models/NotificationLog');
const { sendMail } = require('../utils/mailer');
const { sendMessage } = require('../utils/message');
const { connection } = require('../loaders/dbLoader');

async function fetchNotification(retries = 3, delay = 2000) {
    await connection();
    try {
        const today = new Date('2026-01-30')

        const notifications = await Notification.find({
            is_active: true, is_snoozed: false,
            $expr: {
                $and: [
                    {
                        $lte: [
                            { $dateTrunc: { date: today, unit: "day" } },
                            { $dateTrunc: { date: "$next_notification_date", unit: "day" } }
                        ]
                    },
                    {
                        $gte: [
                            { $dateTrunc: { date: today, unit: "day" } },
                            {
                                $dateTrunc: {
                                    date: {
                                        $dateSubtract: {
                                            startDate: "$next_notification_date",
                                            unit: {
                                                $switch: {
                                                    branches: [
                                                        { case: { $eq: ["$notify_before_unit", "Month"] }, then: "month" },
                                                        { case: { $eq: ["$notify_before_unit", "Week"] }, then: "week" },
                                                        { case: { $eq: ["$notify_before_unit", "Day"] }, then: "day" }
                                                    ],
                                                    default: "day"
                                                }
                                            },
                                            amount: "$notify_before"
                                        }
                                    },
                                    unit: "day"
                                }
                            }
                        ]
                    },
                    {
                        $or: [
                            { $eq: ["$last_notification_sent", null] },
                            {
                                $eq: [
                                    { $dateTrunc: { date: today, unit: "day" } },
                                    { $dateTrunc: { date: "$next_notification_date", unit: "day" } }
                                ]
                            },
                            {
                                $eq: [
                                    { $dateTrunc: { date: today, unit: "day" } },
                                    {
                                        $dateTrunc: {
                                            date: {
                                                $dateAdd: {
                                                    startDate: "$last_notification_sent",
                                                    unit: {
                                                        $switch: {
                                                            branches: [
                                                                { case: { $eq: ["$notific_gap_unit", "Month"] }, then: "month" },
                                                                { case: { $eq: ["$notific_gap_unit", "Week"] }, then: "week" },
                                                                { case: { $eq: ["$notific_gap_unit", "Day"] }, then: "day" }
                                                            ],
                                                            default: "day"
                                                        }
                                                    },
                                                    amount: "$notification_frequency"
                                                }
                                            },
                                            unit: "day"
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
            'title description category_names notify_user_list next_notification_date'
        ).populate('notify_user_list', '_id username email phone').lean();
        return notifications;
    } catch (error) {
        console.error('Error fetching notifications:', error.message);

        if (retries > 0) {
            console.log(`Retrying in ${delay}ms... (${retries} retries left)`);
            await new Promise(res => setTimeout(res, delay));
            return fetchNotification(retries - 1, delay);
        }
        throw new Error('Failed to fetch notifications');
    }
}

// fetchNotification().then((res) => {
//     console.log(res);
// })

async function updateLastSendDate(notificIds, retries = 3, delay = 2000) {
    try {
        await connection();

        const today = new Date();

        const result = await Notification.updateMany(
            {
                _id: { $in: notificIds }
            },
            {
                $set: { last_notification_sent: today }
            }
        );

        console.log(`Matched: ${result.matchedCount}, Updated: ${result.modifiedCount}`);
    } catch (error) {
        console.error('Error updating notifications:', error.message);

        if (retries > 0) {
            console.log(`Retrying in ${delay}ms... (${retries} retries left)`);
            await new Promise(res => setTimeout(res, delay));
            return updateLastSendDate(notificIds, retries - 1, delay);
        }
        throw new Error('Failed to update last_notification_sent');
    }
}

// const notificIds = ['691704662c86fe6cc45d917f', '6916f6ab2c225cced833dfc9'];
// updateLastSendDate(notificIds).then((res) => {

// })

async function retryInsertMany(logs, maxRetries = 3, delayMs = 2000) {
    try {
        return await NotificationLog.insertMany(logs);
    } catch (err) {
        console.error(`Insert attempt failed:`, err.message);
        if (maxRetries <= 1) {
            throw new Error(`Failed to insert logs after retries: ${err.message}`);
        }
        await new Promise(resolve => setTimeout(resolve, delayMs));
        return retryInsertMany(logs, maxRetries - 1, delayMs);
    }
}


async function saveNotificationLogs(notificIds, nRes) {

    const logs = [];

    nRes?.forEach((singleRes, ind) => {
        const singleLog = {
            notification_id: notificIds[ind],
            mailSuccessUsers: [],
            msgSuccessUsers: [],
            mailFailedUsers: [],
            msgFailedUsers: []
        };

        singleRes?.forEach((userRes) => {

            if (userRes.emailStatus === 'success') {
                singleLog.mailSuccessUsers.push(userRes.userId);
            } else {
                singleLog.mailFailedUsers.push({
                    userId: userRes.userId,
                    error: userRes.emailError
                });
            }

            if (userRes.msgStatus === 'success') {
                singleLog.msgSuccessUsers.push(userRes.userId);
            } else {
                singleLog.msgFailedUsers.push({
                    userId: userRes.userId,
                    error: userRes.msgError
                });
            }
        });

        singleLog.sent_date = new Date('2026-01-23');

        logs.push(singleLog);
    });

    try {
        await retryInsertMany(logs);
        console.log("notification logs saved successfuly");
    } catch (error) {
        return false;
    }
}


async function updateNotification(retries = 3, delay = 2000) {
    try {
        await connection();
        const today = new Date("2026-01-30");

        await Notification.updateMany(
            {
                $expr: {
                    $eq: [
                        { $dateTrunc: { date: today, unit: "day" } },
                        { $dateTrunc: { date: "$next_notification_date", unit: "day" } }
                    ]
                }
            },
            [
                {
                    $set: {
                        is_snoozed: false,
                        last_notification_sent: null,
                        next_notification_date: {
                            $dateAdd: {
                                startDate: "$next_notification_date",
                                unit: "month",
                                amount: "$frequency"
                            }
                        }
                    }
                }
            ],
        )
        console.log("notification date updated successfully");
    } catch (error) {
        console.error('Error updating notifications:', error.message);

        if (retries > 0) {
            console.log(`Retrying in ${delay}ms... (${retries} retries left)`);
            await new Promise(res => setTimeout(res, delay));
            return updateNotification(retries - 1, delay);
        }
        throw new Error('Failed to update notifications');
    }
}

// updateNotification().then((res) => {
//     console.log(res)
// })


async function sendNotification(mailTemp, msgTemp, email, phone, userId) {

    const result = {
        userId,
        emailStatus: "success",
        msgStatus: "success",
        emailError: null,
        msgError: null
    }

    try {
        const randomInt = Math.floor(Math.random() * 10) + 1;
        const emailRes = await sendMail(mailTemp, email, randomInt);
    } catch (error) {
        result.emailStatus = "Failed";
        result.emailError = error.message;
    }

    try {
        const randomInt = Math.floor(Math.random() * 10) + 1;
        const msgRes = await sendMessage(msgTemp, phone, randomInt);
    } catch (error) {
        result.msgStatus = "Failed";
        result.msgError = error.message;
    }

    return result;
}


module.exports = {
    fetchNotification,
    updateLastSendDate,
    updateNotification,
    sendNotification,
    saveNotificationLogs
}