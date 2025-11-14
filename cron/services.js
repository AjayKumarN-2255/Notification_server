const Notification = require('../models/Notification');
const { connection } = require('../loaders/dbLoader');

async function fetchNotification(params) {
    await connection();

    const today = new Date('2025-11-30')
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
}

fetchNotification().then((res) => {
    console.log(res);
})

// async function updateLastSendDate(params) {

// }

// async function saveNotificationLogs(params) {

// }


// async function updateNotification(params) {

// }


module.exports = {
    fetchNotification,
    // updateLastSendDate,
    // updateNotification,
    // saveNotificationLogs
}