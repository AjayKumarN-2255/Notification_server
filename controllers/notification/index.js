const { addNotification } = require('./addNotification');
const { getUserNotification } = require('./getUserNotification');
const { snoozeNotification } = require('./snoozeNotification');
const { stopNotification } = require('./stopNotification');
const { deleteNotification } = require('./deleteNotification');
const { getSingleNotification } = require('./getSingle');


module.exports = {
    addNotification,
    getUserNotification,
    snoozeNotification,
    stopNotification,
    getSingleNotification,
    deleteNotification
}