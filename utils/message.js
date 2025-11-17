

async function sendMessage(msgTemp, phone, ind) {
    if ([3, 7, 1, 10, 5].includes(ind)) {
        throw new Error(`Failed to send message to ${phone} at index ${ind}`);
    }

    await new Promise(resolve => setTimeout(resolve, 100));

    console.log(`send message to ${phone} successfuly`)
    return true;
}

module.exports = {
    sendMessage
}