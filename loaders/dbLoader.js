const mongoose = require('mongoose');
// process.env.MONGO_URL
async function connection() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Notification');
        console.log("database connected successfully");
    } catch (error) {
        console.log(error)
        console.log("database connection failed");
    }
}

module.exports = {
    connection
}