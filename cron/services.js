const Notification = require('../models/Notification');
const { connection } = require('../loaders/dbLoader');

async function fetchNotification(retries = 3, delay = 2000) {
    await connection();
    try {
        const today = new Date('2025-11-27')

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
        ).populate('notify_user_list');
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

async function updateLastSendDate(notificIds, retries = 3, delay = 1000) {
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

// async function saveNotificationLogs(params) {

// }


async function updateNotification(retries = 3, delay = 1000) {
    try {
        await connection();
        const today = new Date("2026-02-23");
     
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

updateNotification().then((res) => {
    console.log(res)
})


module.exports = {
    fetchNotification,
    updateLastSendDate,
    updateNotification,
    // saveNotificationLogs
}